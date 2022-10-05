// Importation d'express
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const stuffRoutes = require("./routes/sauces");
const path = require("path");

//Connection à MongoDB via Mongoose
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

app.use(express.json());
//direction vers routes/sauces
app.use("/api/sauces", stuffRoutes);
// direction vers routes/user
app.use("/api/auth", userRoutes);

app.use("/images", express.static(path.join(__dirname, "images")));

// permet d'exporter l'application
module.exports = app;
