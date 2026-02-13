import express from "express";
import path from "path";

import sequelize from "./config/database";
import userRoutes from "./routes/userRoutes";
import "./models/User";

const app = express();

app.use(express.json());

// Sert le dossier public (index.html et script.js)
app.use(express.static(path.join(process.cwd(), "public")));

// API users
app.use("/api/users", userRoutes);

sequelize
  .sync()
  .then(() => {
    console.log("Connexion bdd sync ok");
    app.listen(3000, () => {
      console.log("Serveur lancé sur http://localhost:3000");
    });
  })
  .catch((err) => {
    console.error("Erreur DB:", err);
  });
