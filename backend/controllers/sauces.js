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
  req.file
    ? // Si la modification contient une image => Utilisation de l'opérateur ternaire comme structure conditionnelle.
      (Sauce.findOne({
        _id: req.params.id,
      }).then((sauce) => {
        // On supprime l'ancienne image du serveur
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlinkSync(`images/${filename}`);
      }),
      (sauceObject = {
        // On modifie les données et on ajoute la nouvelle image
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }))
    : // Opérateur ternaire équivalent à if() {} else {} => condition ? Instruction si vrai : Instruction si faux
      // Si la modification ne contient pas de nouvelle image
      (sauceObject = {
        ...req.body,
      });
  // Rechercher l'objet dans la base de donnée pour récuperer et vérifier
  Sauce.findOne({ _id: req.params.id });

  // Sinon si c'est bien le bon utilisateur
  Sauce.updateOne(
    // On applique les paramètre de sauceObject
    {
      _id: req.params.id,
    },
    {
      ...sauceObject,
      _id: req.params.id,
    }
  )
    .then(() =>
      res.status(200).json({
        message: "Sauce modifiée !",
      })
    )
    .catch((error) =>
      res.status(400).json({
        error,
      })
    );
};

//Permet de supprimé un élément
exports.deleteThing = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      // Pour extraire ce fichier, on récupère l'url de la sauce, et on le split autour de la chaine de caractères, donc le nom du fichier
      const filename = sauce.imageUrl.split("/images/")[1];
      // Avec ce nom de fichier, on appelle unlink pour suppr le fichier
      fs.unlink(`images/${filename}`, () => {
        // On supprime le document correspondant de la base de données
        Sauce.deleteOne({
          _id: req.params.id,
        })
          .then(() =>
            res.status(200).json({
              message: "Sauce supprimée !",
            })
          )
          .catch((error) =>
            res.status(400).json({
              error,
            })
          );
      });
    })
    .catch((error) =>
      res.status(500).json({
        error,
      })
    );
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
