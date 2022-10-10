const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Enregistrement de nouveaux utilisateurs et
// Hachage du mot de passe
exports.signup = (req, res, next) => {
  // On appelle la méthode hash de bcrypt et on lui passe le mdp de l'utilisateur, le salte (10) ce sera le nombre de tours qu'on fait faire à l'algorithme
  bcrypt
    .hash(req.body.password, 10)
    // On récupère le hash de mdp qu'on va enregister en tant que nouvel utilisateur dans la BBD mongoDB
    .then((hash) => {
      // Création du nouvel utilisateur avec le model mongoose
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      // On enregistre l'utilisateur dans la base de données
      user
        .save()
        .then(() =>
          res.status(201).json({
            message: "Utilisateur créé !",
          })
        )
        .catch((error) =>
          res.status(400).json({
            error,
          })
        );
      // Si il existe déjà un utilisateur avec cette adresse email
    })
    .catch((error) =>
      res.status(500).json({
        error,
      })
    );
};
// Fonction pour connecter un utilisateur déja existant
exports.login = (req, res, next) => {
  // Compare l'email donné avec celui enregistré dans la BDD.
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "Paire login/mot de passe incorrecte" });
      }
      // Compare le password rentré avec celui enregistré dans la base de donnée
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: "Paire login/mot de passe incorrecte" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
