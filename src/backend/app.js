// Importation d'express
const express = require("express");
const userRoutes = require("./routes/user");

//Importation de Mongoose puis connection à MongoDB
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://Projet-6-utilisateur:0000@cluster0.dtatrcf.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Constante de l'application avec express
const app = express();

// Permet d'enlever l'erreur CORS (Sécurité pour requetes malvaillantes)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
//Permet de regler l'erreur "CORS"
// Cela permet de donner une réponse automatiquement en format JSON pour tout type de requete
app.use((req, res, next) => {
  res.json({ message: "Votre requête à bien été recu ! " });
  next();
});
app.use((req, res) => {
  console.log("Réponse envoyé avec succès");
});

app.use("/api/auth", userRoutes);
// permet d'exporter l'application
module.exports = app;
