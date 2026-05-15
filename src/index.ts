import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import router from "./routes/index";
import { requestLogger } from "./middleware/logger";
import { responseHelper } from "./middleware/responseHelper";
import { mockDelay } from "./middleware/delay";

const host = process.env.HOST ?? "localhost";
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

// ─── Core middleware ──────────────────────────────────────────────────────────
app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));

// ─── Mock-specific middleware ─────────────────────────────────────────────────
app.use(requestLogger);   // colorized request logs
app.use(responseHelper);  // attaches res.success() / res.fail()
app.use(mockDelay);       // simulates network latency (set MOCK_DELAY_MS=0 to skip)

// ─── Root ─────────────────────────────────────────────────────────────────────
app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Welcome to Graphite Service! (mock)" });
});

// ─── API routes ───────────────────────────────────────────────────────────────
app.use("/api", router);

// ─── 404 handler ─────────────────────────────────────────────────────────────
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: `Route not found: ${req.method} ${req.originalUrl}`,
    timestamp: new Date().toISOString(),
  });
});

// ─── Global error handler ─────────────────────────────────────────────────────
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("[error]", err.message);
  res.status(500).json({
    success: false,
    error: err.message,
    timestamp: new Date().toISOString(),
  });
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(port, host, () => {
  console.log(`\n🔧 Mock server running → http://${host}:${port}`);
  console.log(`   MOCK_DELAY_MS = ${process.env.MOCK_DELAY_MS ?? 150}ms`);
  console.log(`\n   Routes:`);
  console.log(`   GET    /api/health`);
  console.log(`   GET    /api/users`);
  console.log(`   POST   /api/users`);
  console.log(`   GET    /api/users/:id`);
  console.log(`   DELETE /api/users/:id`);
  console.log(`   GET    /api/items[?status=active|pending|inactive]`);
  console.log(`   POST   /api/items`);
  console.log(`   GET    /api/items/:id`);
  console.log(`   PATCH  /api/items/:id`);
  console.log(`   DELETE /api/items/:id\n`);
});
