//Ajout q6.3
import userRoutes from "./routes/userRoutes";




import express, { type Request, type Response } from "express";

const app = express();
const PORT = 3000;

//Ajoutq6.3
app.use(userRoutes);


//Code ajouter pour la q6.1
type Etudiant = { id: number; nom: string; prenom: string };

const etudiants: Etudiant[] = [
  { id: 1, nom: "Dupont", prenom: "Jean" },
  { id: 2, nom: "Martin", prenom: "Sophie" },
  { id: 3, nom: "Doe", prenom: "John" },
];

app.get("/api/data", (req: Request, res: Response) => res.json(etudiants));






//Code ajouter pour la q6.2
app.get("/api/hello/:name", (req: Request, res: Response) => {
  const { name } = req.params;

  res.json({
    message: `Bonjour ${name}`,
    timestamp: new Date().toISOString(),
  });
});








app.get("/", (req: Request, res: Response) => {
  res.send("Bienvenue sur mon serveur API");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
