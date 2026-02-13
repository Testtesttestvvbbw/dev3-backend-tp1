import { Router } from "express";
import User from "../models/User";

const router = Router();


router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});


router.post("/", async (req, res) => {
  try {
    const { nom, prenom } = req.body;

    if (!nom || !prenom) {
      return res.status(400).json({ error: "nom et prenom requis" });
    }

    const user = await User.create({ nom, prenom });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "id invalide" });
    }

    const deleted = await User.destroy({ where: { id } });

    if (deleted === 0) {
      return res.status(404).json({ error: "Utilisateur introuvable" });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
