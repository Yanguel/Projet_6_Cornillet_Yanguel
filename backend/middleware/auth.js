const jwt = require("jsonwebtoken");
/* Permet vérifier que l’utilisateur est bien connecté et de transmettre les informations 
de connexion aux différentes méthodes qui vont gérer les requêtes. */
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET_123");
    const userId = decodedToken.userId;
    // si le token ne correspond pas au userId : erreur
    if (req.body.userId && req.body.userId !== userId) {
      throw "userId non valide";
    }
    // si tout est valide on passe au prochain middleware
    else {
      next();
    }
  } catch (error) {
    res.status(403).json({ error: error | "Requête non authentifiée !" });
  }
};
