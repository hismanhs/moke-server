import { Request, Response, NextFunction } from "express";

const colors = {
  reset: "\x1b[0m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  dim: "\x1b[2m",
};

const methodColor: Record<string, string> = {
  GET: colors.green,
  POST: colors.cyan,
  PUT: colors.yellow,
  PATCH: colors.yellow,
  DELETE: colors.red,
};

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const start = Date.now();
  const color = methodColor[req.method] ?? colors.reset;

  res.on("finish", () => {
    const ms = Date.now() - start;
    const statusColor = res.statusCode >= 400 ? colors.red : colors.green;

    console.log(
      `${colors.dim}[mock]${colors.reset} ` +
        `${color}${req.method.padEnd(6)}${colors.reset} ` +
        `${req.originalUrl.padEnd(40)} ` +
        `${statusColor}${res.statusCode}${colors.reset} ` +
        `${colors.dim}${ms}ms${colors.reset}`
    );
  });

  next();
};
