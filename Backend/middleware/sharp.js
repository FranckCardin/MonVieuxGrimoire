const sharp = require('sharp');
const fs = require("fs");
const path = require("path");

module.exports = (req, res, next) => {
    try {
        //Renvoie un objet dont les propriétés représentent des éléments significatifs du chemin
        const filePathObject = path.parse(req.file.filename);
        
        sharp(req.file.path)
            //Conversion de l'image en webp
            .webp()
            //Retaille l'image 
            .resize({
                width: 500,
            })
            //Enregistrer l'image dans le dossier images concerné
            .toFile(`images/${filePathObject.name}.webp`, () => {
                //Suppression de l'img original
                fs.unlinkSync(`./images/${req.file.filename}`);
                //Renomme l'image
                req.file = {
                    filename: `${filePathObject.name}.webp`
                };
                next();
            })
            .catch(error => {
                res.status(400).json({ error });
            });
            } catch {
                (error) => res.status(401).json({ error });
            }
        };
