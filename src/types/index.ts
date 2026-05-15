// ─── API Response Wrapper ────────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp: string;
}

// ─── Example Domain Types (replace with your actual models) ──────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface Item {
  id: string;
  title: string;
  description: string;
  status: "active" | "inactive" | "pending";
  createdAt: string;
}

// ─── Request Body Types ───────────────────────────────────────────────────────

export interface CreateUserBody {
  name: string;
  email: string;
}

export interface CreateItemBody {
  title: string;
  description: string;
}

export interface UpdateItemBody {
  title?: string;
  description?: string;
  status?: Item["status"];
}
