//IMPORT PACKAGE MULTER
const multer = require('multer');
//IMPORT PATH EXPRESS
const path = require('path');

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
        const originalName = file.originalname.split(' ').join('_');
        //Récupération du nom d'origine sans l'extension dans le nom
        const newName = path.parse(originalName).name;
        //Ajout d'un timestamp Date.now() comme nom de fichier
        callback(null, newName + Date.now());
    }
});

//EXPORT MODULE MULTER
module.exports = multer( {storage }).single('image');