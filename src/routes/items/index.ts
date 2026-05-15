import { Router, Request, Response } from "express";
import { mockItems, generateId } from "../../data/store";
import { CreateItemBody, UpdateItemBody, Item } from "../../types";

const router = Router();

// GET /api/items  (optional ?status= filter)
router.get("/", (req: Request, res: Response) => {
  const { status } = req.query;
  const result = status
    ? mockItems.filter((i) => i.status === status)
    : mockItems;
  res.success(result, `Returned ${result.length} items`);
});

// GET /api/items/:id
router.get("/:id", (req: Request, res: Response) => {
  const item = mockItems.find((i) => i.id === req.params.id);
  if (!item) return res.fail(`Item '${req.params.id}' not found`, 404);
  res.success(item);
});

// POST /api/items
router.post("/", (req: Request<{}, {}, CreateItemBody>, res: Response) => {
  const { title, description } = req.body;
  if (!title || !description)
    return res.fail("title and description are required");

  const newItem: Item = {
    id: generateId("itm"),
    title,
    description,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  mockItems.push(newItem);
  res.success(newItem, "Item created", 201);
});

// PATCH /api/items/:id
router.patch(
  "/:id",
  (req: Request<{ id: string }, {}, UpdateItemBody>, res: Response) => {
    const idx = mockItems.findIndex((i) => i.id === req.params.id);
    if (idx === -1) return res.fail(`Item '${req.params.id}' not found`, 404);

    mockItems[idx] = { ...mockItems[idx], ...req.body };
    res.success(mockItems[idx], "Item updated");
  }
);

// DELETE /api/items/:id
router.delete("/:id", (req: Request, res: Response) => {
  const idx = mockItems.findIndex((i) => i.id === req.params.id);
  if (idx === -1) return res.fail(`Item '${req.params.id}' not found`, 404);

  const [deleted] = mockItems.splice(idx, 1);
  res.success(deleted, "Item deleted");
});

export default router;
