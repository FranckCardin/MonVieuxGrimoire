//IMPORT MONGOOSE MONGODB
const mongoose = require('mongoose');
//IMPORT PACKAGE MONGOOSE - UNIQUE VALIDATOR
const uniqueValidator = require('mongoose-unique-validator');

//CRÉATION DU MODEL DE LA BASE DE DONNÉE POUR UN USER
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

//PLUGIN VALIDER EMAIL UNIQUE
userSchema.plugin(uniqueValidator);

//EXPORT MODEL USER
module.exports = mongoose.model('User', userSchema);