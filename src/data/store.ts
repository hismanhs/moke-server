import { User, Item } from "../types";

// ─── In-memory mock data ───────────────────────────────────────────────────────
// Replace with DB calls in production

export const mockUsers: User[] = [
  {
    id: "usr_001",
    name: "Alice Johnson",
    email: "alice@example.com",
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "usr_002",
    name: "Bob Smith",
    email: "bob@example.com",
    createdAt: "2024-02-20T14:30:00Z",
  },
];

export const mockItems: Item[] = [
  {
    id: "itm_001",
    title: "First Item",
    description: "This is the first mock item",
    status: "active",
    createdAt: "2024-01-16T09:00:00Z",
  },
  {
    id: "itm_002",
    title: "Second Item",
    description: "This is the second mock item",
    status: "pending",
    createdAt: "2024-02-21T11:00:00Z",
  },
  {
    id: "itm_003",
    title: "Third Item",
    description: "This one is inactive",
    status: "inactive",
    createdAt: "2024-03-01T08:00:00Z",
  },
];

// ─── Simple ID generator ──────────────────────────────────────────────────────

export const generateId = (prefix: string): string =>
  `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
