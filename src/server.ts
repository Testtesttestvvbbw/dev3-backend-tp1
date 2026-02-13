import sequelize from "./config/database";
import User from "./models/User";
import express from "express";

const app =express();

sequelize.sync ()
.then(function() {
console.log("Connexion bdd sync ok") ;
app.listen(3000,function(){
console.log("Serveur lance") ;
}) ;
}) ;
