import express from "express";
import path from "path";

import sequelize from "./config/database";
import "./models/User"; // s'assure que le modèle est chargé
import userRoutes from "./routes/userRoutes";




import path from "path";





const app = express();

// JSON
app.use(express.json());


app.use(express.static(path.join(process.cwd(), "public")));

// API
app.use("/api/users", userRoutes);

// DB sync puis serveur
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
