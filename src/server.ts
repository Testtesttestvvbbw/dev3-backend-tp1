import express from "express";
import sequelize from "./config/database";
import userRoutes from "./routes/userRoutes";

const app = express();

app.use(express.json());


app.use("/api/users", userRoutes);

sequelize.sync().then(() => {
  console.log("Connexion bdd sync ok");
  app.listen(3000, () =>
    console.log("Serveur lancé sur http://localhost:3000")
  );
});
