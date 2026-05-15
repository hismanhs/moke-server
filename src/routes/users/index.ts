import { Router, Request, Response } from "express";
import { mockUsers, generateId } from "../../data/store";
import { CreateUserBody, User } from "../../types";

const router = Router();

// GET /api/users
router.get("/", (_req: Request, res: Response) => {
  res.success(mockUsers, `Returned ${mockUsers.length} users`);
});

// GET /api/users/:id
router.get("/:id", (req: Request, res: Response) => {
  const user = mockUsers.find((u) => u.id === req.params.id);
  if (!user) return res.fail(`User '${req.params.id}' not found`, 404);
  res.success(user);
});

// POST /api/users
router.post("/", (req: Request<{}, {}, CreateUserBody>, res: Response) => {
  const { name, email } = req.body;
  if (!name || !email) return res.fail("name and email are required");

  const newUser: User = {
    id: generateId("usr"),
    name,
    email,
    createdAt: new Date().toISOString(),
  };

  mockUsers.push(newUser);
  res.success(newUser, "User created", 201);
});

// DELETE /api/users/:id
router.delete("/:id", (req: Request, res: Response) => {
  const idx = mockUsers.findIndex((u) => u.id === req.params.id);
  if (idx === -1) return res.fail(`User '${req.params.id}' not found`, 404);

  const [deleted] = mockUsers.splice(idx, 1);
  res.success(deleted, "User deleted");
});

export default router;
