const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const stuffCtrl = require("../controllers/sauces");

// Recuperer tout les objets
router.get("/", auth, stuffCtrl.getAllThing);
// Permet d'enregistrer l'objet crée par l'utilisateur
// et de l'afficher
router.post("/", auth, multer, stuffCtrl.createThing);
//Permet de récuperer un schéma spécifique
router.get("/:id ", auth, stuffCtrl.getOneThing);
// Permet de mettre à jour un Schéma déja existant
router.put("/:id", auth, multer, stuffCtrl.modifyThing);
//Permet de supprimé un élément
router.delete("/:id", auth, stuffCtrl.deleteThing);

module.exports = router;
