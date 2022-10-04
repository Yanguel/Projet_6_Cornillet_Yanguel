// Importation d'express
const express = require("express");
const userRoutes = require("./routes/user");
const thing = require("./models/Thing");
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
// Permet d'enregistrer l'objet crée par l'utilisateur
// et de l'afficher
app.post("/api/sauces", (req, res, next) => {
  delete req.body._id;
  const thing = new Thing({
    ...req.body,
  });
  thing
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
});

app.use("/api/sauces", (req, res, next) => {
  const stuff = [
    {
      _id: "oeihfzeoi",
      title: "Mon premier objet",
      description: "Les infos de mon premier objet",
      imageUrl:
        "https://pimentoiseau.fr/wp-content/uploads/2019/11/sauce-piquante-africaine.jpg",
      price: 4900,
      userId: "qsomihvqios",
    },
    {
      _id: "oeihfzeomoihi",
      title: "Mon deuxième objet",
      description: "Les infos de mon deuxième objet",
      imageUrl:
        "https://china-market.fr/159-large_default/sauce-piment-extra-fort-142ml-encona.jpg",
      price: 2900,
      userId: "qsomihvqios",
    },
    {
      _id: "oeihfzeomoihi",
      title: "Mon deuxième objet",
      description: "Les infos de mon deuxième objet",
      imageUrl:
        "https://www.sauce-piquante.fr/162-large_default/sauce-piquante-moruga-trinidad-scorpion.jpg",
      price: 2900,
      userId: "qsomihvqios",
    },
    {
      _id: "oeihfzeomoihi",
      title: "Mon deuxième objet",
      description: "Les infos de mon deuxième objet",
      imageUrl:
        "http://pimentoiseau.fr/wp-content/uploads/2019/11/sauce-piquante-gingembre-combava-ginger-and-kaffir-lime-hot-sauce-595x875.jpg",
      price: 2900,
      userId: "qsomihvqios",
    },
  ];
  res.status(200).json(stuff);
});

//Permet de récuperer un schéma spécifique
app.get("/api/sauces/:id ", (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }));
});

// Permet de mettre à jour un Schéma déja existant
app.put("/api/sauces/:id", (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
});

//Permet de supprimé un élément
app.delete("/api/stuff/:id", (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
});

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
