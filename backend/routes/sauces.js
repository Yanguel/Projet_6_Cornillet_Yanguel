const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const saucesCtrl = require("../controllers/sauces");

// Recuperer tout les objets
router.get("/", auth, saucesCtrl.getAllThing);

// Permet d'enregistrer l'objet crée par l'utilisateur
// et de l'afficher
router.post("/", auth, multer, saucesCtrl.createThing);

//Permet de récuperer un schéma spécifique
router.get("/:id ", auth, saucesCtrl.getOneThing);

// Permet de mettre à jour un Schéma déja existant
router.put("/:id", auth, multer, saucesCtrl.modifyThing);

//Permet de supprimé un élément
router.delete("/:id", auth, saucesCtrl.deleteThing);

module.exports = router;