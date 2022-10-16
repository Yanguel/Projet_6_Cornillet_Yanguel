const passwordValidator = require("password-validator");

// Schéma de mot de passe plus sécurisé
const passwordSchema = new passwordValidator();

// Contraintes du mot de passe
passwordSchema
  .is()
  .min(5) // Longueur minimun : 5
  .has()
  .uppercase() // Doit avoir au moins une majuscule
  .has()
  .lowercase() // Doit avoir au moins une minuscule
  .has()
  .digits() // Doit avoir au moins un chiffre
  .is()
  .not()
  .oneOf(["Password123"]); // Blacklist de valeurs à proscrire

module.exports = passwordSchema;
