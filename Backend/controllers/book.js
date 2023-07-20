//IMPORT PACKAGE FS 
const fs = require('fs');
//IMPORT MODEL BOOK 
const Book = require('../models/book');

//FUNCTION AJOUT LIVRE
exports.addBook = (req, res, next) => {
    //Convertir la chaîne JSON en objet JS
    const bookObject = JSON.parse(req.body.book);
    //Suppression des id generer par le FrontEnd
    delete bookObject._id;
    delete bookObject.userId;
    //Creation du livre
    const book = new Book ({
        ...bookObject,
        //Utilisation du UserID extrait du token 
        userId: req.auth.userId,
        //Generation d'une URL pour l'image
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }); 
    //Sauvegarde du livre dans la BDD
    book.save()
        .then(() => {
            res.status(201).json({ message: 'Object enregistré !' });
        })
        .catch(error => {
            res.status(400).json({ error });
        });
};

//FUNCTION AFFICHER TOUS LES LIVRES
exports.getAllBooks = (req, res, next) => {
    Book.find()
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));
};

//FUNCTION AFFICHER UN SEUL LIVRE
exports.getOneBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then(book => res.status(200).json(book))
        .catch(error => res.status(404).json({ error }));
};


//FUNCTION MODIFIER LIVRE
exports.updateBook = (req, res, next) => {
    //Si champs file, récupération de l'object en passant la chaine de caractère en recréant l'URL de l'img
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } 
    //Sinon on récupère l'object directement dans le corps de la requête 
    : { ...req.body };

    //Suppression de l'userID de l'objet Livre
    delete bookObject.userId;
    //Récupération du livre correspond à l'id
    Book.findOne({ _id: req.params.id })
        .then((book) => {
            //Comparaison des id pour savoir si c'est le bon utilisateur
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message: "Non Autorisé !"});
            }
            else{
                //Mise à jour du livre avec l'objet modifié avec l'id de l'URL
                Book.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id})
                    .then(() => res.status(200).json({ message: " Objet modifié!" }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};


//FUNCTION SUPPRIMER LIVRE
exports.deleteBook = (req, res, next) => {
    //Récupération du livre correspond à l'id
    Book.findOne({ _id: req.params.id})
        .then(book => {
            //Comparaison des id pour savoir si c'est le bon utilisateur
            if(book.userId != req.auth.userId){
                res.status(401).json({ message: " Non autorisé !" });
            } 
            else{
                //Récupération du nom de fichier
                const filename = book.imageUrl.split('/images/')[1];
                //Suppresion par la méthode Unlink du package FS
                fs.unlink(`/images/${filename}`, () => {
                    //Suppression du livre concerné dans la base de donnée
                    Book.deleteOne({ _id: req.params.id})
                    .then(() => { 
                        res.status(200).json({ message: " Objet supprimée !" })
                    })
                    .catch(error => { 
                        res.status(401).json ({ error })
                    })
                });
            }
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
};
