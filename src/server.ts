import express from "express";
import sequelize from "./config/database";
import userRoutes from "./routes/userRoutes";
import path from "path";

const app = express();

app.use(express.json());

// Sert le dossier public
app.use(express.static(path.join(__dirname, "../public")));

// Routes API
app.use("/api/users", userRoutes);

sequelize.sync().then(() => {
  console.log("Connexion bdd sync ok");
  app.listen(3000, () =>
    console.log("Serveur lancé sur http://localhost:3000")
  );
});
