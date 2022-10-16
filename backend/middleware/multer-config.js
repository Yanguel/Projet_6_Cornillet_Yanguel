// Le package "multer" permet de gérer les fichiers entrants dans les requêtes HTTP
const multer = require("multer");

// On crée un dictionnaire des types MIME pour définire le format des images
// Donc la creation d'un objet pour ajouter une extention en fonction du type mime du ficher
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  // Indique la destination de l'enregistrement d'image
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  //Modifie et indique le nom donné à l'image
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];

    callback(null, name + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage: storage }).single("image");
