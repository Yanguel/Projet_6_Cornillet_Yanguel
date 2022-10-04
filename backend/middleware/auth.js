const jwt = require("jsonwebtoken");
/* Permet vérifier que l’utilisateur est bien connecté et de transmettre les informations 
de connexion aux différentes méthodes qui vont gérer les requêtes. */
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET_123*");
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    res.status(403).json({ error });
  }
};
