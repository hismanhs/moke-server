import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../types";

// ─── Attach helpers to res locals ────────────────────────────────────────────

export const responseHelper = (
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.success = <T>(data: T, message = "OK", status = 200) => {
    const payload: ApiResponse<T> = {
      success: true,
      data,
      message,
      timestamp: new Date().toISOString(),
    };
    res.status(status).json(payload);
  };

  res.fail = (message: string, status = 400) => {
    const payload: ApiResponse = {
      success: false,
      error: message,
      timestamp: new Date().toISOString(),
    };
    res.status(status).json(payload);
  };

  next();
};

// ─── Extend Express Response type ────────────────────────────────────────────

declare global {
  namespace Express {
    interface Response {
      success: <T>(data: T, message?: string, status?: number) => void;
      fail: (message: string, status?: number) => void;
    }
  }
}
