import { Router, type Request, type Response } from "express";

const router = Router();

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

router.get("/api/users", (req: Request, res: Response) => {
  res.json(users);
});

export default router;
