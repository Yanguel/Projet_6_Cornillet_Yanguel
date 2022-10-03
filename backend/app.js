// Importation d'express
const express = require("express");

//Importation de Mongoose puis connection à MongoDB
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://Yanguel:0000@cluster0.dtatrcf.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Constante de l'application avec express
const app = express();

app.use((req, res, next) => {
  console.log("requete recu");
  next();
});

app.use((req, res, next) => {
  res.status(201);
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

// permet d'exporter l'application
module.exports = app;
