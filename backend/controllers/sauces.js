const Sauce = require("../models/sauce");
const fs = require("fs");

// Permet d'enregistrer l'objet crée par l'utilisateur
// et de l'afficher, tout en gérant les images
exports.createThing = (req, res, next) => {
  console.log(req.body);
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  delete sauceObject._userId;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });

  sauce
    .save()
    .then(() => {
      res.status(201).json({ message: "Objet enregistré !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
// Permet de mettre à jour un Schéma déja existant
exports.modifyThing = (req, res, next) => {
  console.log(req.params.id);
  const sauceObject =
    // Une image existe elle ?
    req.file
      ? // Si la modification contient une image =>
        // Nous récuperont l'objet en parsant la chaine de caractère et recréant l'URL de l'image
        {
          ...JSON.parse(req.body.sauce),
          imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        }
      : // Si il n'y a pas d'objet de transmit alors recuperer directement dans le corps de la requete
        { ...req.body };

  //Supprime le userId pour éviter les fraudes
  delete sauceObject._userId;

  // Rechercher l'objet dans la base de donnée pour récuperer et vérifier
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      // Si l'userId est différent de l'userId du token
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      }
      // Sinon si c'est bien le bon utilisateur
      else {
        Sauce.updateOne(
          { _id: req.params.id },
          { ...sauceObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Objet modifié!" }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      console.log("test ", req.body);
      res.status(400).json({ error });
    });
};
//Permet de supprimé un élément
exports.deleteThing = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((thing) => {
      if (thing.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        const filename = thing.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Objet supprimé !" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
// Récuperer un schéma en particulier
exports.getOneThing = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};
// Recuperer tout les objets
exports.getAllThing = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(404).json({ error }));
};
