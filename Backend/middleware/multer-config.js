//IMPORT PACKAGE MULTER
const multer = require('multer');

//DICTIONNAIRE DES EXTENSIONS
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
};

//ENREGISTREMENT SUR LE DISQUE
const storage = multer.diskStorage({
    //FUNCTION DESTINATION
    destination: (req, file, callback) => {
        //Destination du dossier ou le fichier sera enregistré
        callback(null, 'images')
    },
    //FUNCTION NOM FICHIER
    filename: (req, file, callback) => {
        //Utilisation du nom d'origine en remplaçant les espaces par des underscores 
        const name = file.originalname.split(' ').join('_');
        //Utilisation de la constante dictionnaire Type Mine pour résoudre l'extension de fichier appropriée
        const extension = MIME_TYPES[file.mimetype];
        //Ajout d'un timestamp Date.now() comme nom de fichier
        callback(null, name + Date.now() + '.' + extension);
    }
});

//EXPORTATION MULTER
module.exports = multer( {storage }).single('image');