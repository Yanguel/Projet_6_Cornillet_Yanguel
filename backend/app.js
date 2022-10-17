// Importation d'express
const express = require("express");
const bodyParser = require("body-parser");

// Plugin Mongoose pour se connecter à la data base Mongo Db
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");
const saucesRoutes = require("./routes/sauces");

// Plugin qui sert dans l'upload des images et permet de travailler avec les répertoires et chemin de fichier
const path = require("path");

// Utilisation du MiddleWare permettant de se proteger des XSS (Cross-site scripting)
// et contre certaines vulnérabilités Web bien connues en définissant les en-têtes HTTP de manière appropriée.
const helmet = require("helmet");

//Connection à MongoDB via Mongoose
mongoose
  .connect(
    "mongodb+srv://Projet-6-new:0000@cluster0.dtatrcf.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Constante de l'application avec express
const app = express();
app.use(helmet({ crossOriginResourcePolicy: false }));

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

app.use(bodyParser.json());

//direction vers routes/sauces
app.use("/api/sauces", saucesRoutes);

// direction vers routes/user
app.use("/api/auth", userRoutes);

// Midleware qui permet de charger les fichiers qui sont dans le repertoire images
app.use("/images", express.static(path.join(__dirname, "images")));

// permet d'exporter l'application
module.exports = app;
