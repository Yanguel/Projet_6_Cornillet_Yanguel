const express = require("express");
// Permet de lire le fichier ".env"
require("dotenv").config();
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const saucesRoutes = require("./routes/sauces");
// Plugin qui sert dans l'upload des images et permet de travailler avec
//les répertoires et chemin de fichier
const path = require("path");
// Utilisation du MiddleWare permettant de se proteger des XSS (Cross-site scripting)
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
// Package permettant d'éviter l'injection de MongoDB (Sécurité)
const mongoSanitize = require("express-mongo-sanitize");

// Permet d'éviter un nombre de tentatives important
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // fenetre de 15min
  max: 100, // 100 tentatives
  standardHeaders: true,
  legacyHeaders: false,
});

//Connection à MongoDB via le module Mongoose
mongoose
  // La chaine de caractère disponible dans .Env
  .connect(process.env.MONGOCONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => console.log("Connexion à MongoDB échouée !", error));

// Constante de l'application avec express
const app = express();
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(mongoSanitize());

// Permet d'enlever l'erreur CORS (Sécurité pour requetes venant d'autre HTTP)
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

// intercepte les requetes JSON et met la requete dans req.body
app.use(express.json());

//direction vers routes/sauces
app.use("/api/sauces", saucesRoutes);

// direction vers routes/user
app.use("/api/auth", apiLimiter, userRoutes);

// Midleware qui permet de charger les fichiers qui sont dans le repertoire images
app.use("/images", express.static(path.join(__dirname, "images")));

// permet d'exporter l'application
module.exports = app;
