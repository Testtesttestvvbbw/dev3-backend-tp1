import express, { type Request, type Response } from "express";

const app = express();
const PORT = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Bienvenue sur mon serveur API");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
