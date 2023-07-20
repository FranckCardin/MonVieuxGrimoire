//IMPORT EXPRESS
const express = require('express');
//IMPORT PACKAGE MONGOOSE MONGODB
const mongoose = require('mongoose');
//IMPORT ROUTES  
const bookRoutes = require('./routes/book');
const userRoutes = require('./routes/user');
//IMPORT PATH EXPRESS
const path = require('path');

//CONNEXION MONGODB MONGOOSE 
mongoose.connect('mongodb+srv://FranckOCR:OCRFranck@cluster0.do9wn4j.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

//CRÉATION APP EXPRESS
const app = express();

//DONNÉES DE LA REQUETE EN FORMAT JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//EN-TÊTES CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

//ROUTES BOOKS, USERS ET IMAGES 
app.use('/api/books', bookRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

//EXPORT MODULE APP 
module.exports = app;