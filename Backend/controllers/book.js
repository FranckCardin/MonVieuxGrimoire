//IMPORT MODEL BOOK 
const Book = require('../models/book');

//FUNCTION AJOUT LIVRE
exports.addBook = (req, res, next) => {
    //
    const bookObject = JSON.parse(req.body.book);
    //Suppression des id generer par le FrontEnd
    delete bookObject._id;
    delete bookObject._idUser;
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