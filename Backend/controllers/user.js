//IMPORT PACKAGE BCRYPT 
const bcrypt = require('bcrypt');
//IMPORT PACKAGE JSONWEBTOKEN 
const jwt = require('jsonwebtoken');

//IMPORT MODEL USER 
const User = require('../models/user');

//FUNCTION NOUVEAU UTILISATEUR 
exports.signup = (req, res, next) => {
    //Cryptage du mot de passe
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            //Création nouvel utilisateur
            const user = new User({
                email: req.body.email,
                password: hash
            });
            //Sauvegarde du nouvel utilisateur dans la BDD
            user.save()
                .then(() => res.status(201).json({ message: 'utilisateur créé ! ' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }))
};

//FUNCTION CONNEXION UTILISATEUR
exports.login = (req, res, next) => {
    //Verification si l'adresse email est correct
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user === null) {
                res.status(401).json({ message: 'Paire identifiant / mot de passe incorecte' });
            } else {
                //Comparaison des mots de passe pour vérifier si il est correct
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            res.status(401).json({ message: 'Paire identifiant / mot de passe incorecte' })
                        } else {
                            res.status(200).json({
                                userId: user._id,
                                //Creation d'un token d'une durée de 24h
                                token: jwt.sign(
                                    { userId: user._id },
                                    'RANDOM_TOKEN_SECRET',
                                    { expiresIn: '24h' }
                                )
                            });
                        }
                    })
                    .catch(error => {
                        res.status(500).json({ error });
                    })
            }
        })
        .catch(error => res.status(500).json({ error }))
};