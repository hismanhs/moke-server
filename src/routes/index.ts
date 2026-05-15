import { Router } from "express";
import usersRouter from "./users";
import itemsRouter from "./items";

const router = Router();

// ─── Mount sub-routers ────────────────────────────────────────────────────────
router.use("/users", usersRouter);
router.use("/items", itemsRouter);

// ─── Health check ─────────────────────────────────────────────────────────────
router.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

export default router;
