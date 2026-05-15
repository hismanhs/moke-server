import { Request, Response, NextFunction } from "express";

/**
 * Simulates network latency for realistic mock behavior.
 * Set MOCK_DELAY_MS env var (default: 150ms).
 * Set MOCK_DELAY_MS=0 to disable.
 */
export const mockDelay = (
  _req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const delay = Number(process.env.MOCK_DELAY_MS ?? 150);
  if (delay === 0) return next();
  setTimeout(next, delay);
};
