//IMPORT MONGOOSE MONGODB
const mongoose = require('mongoose')

//CRÉATION DU MODEL DE LA BASE DE DONNÉE POUR UN BOOK
const bookSchema = mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    imageUrl: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    ratings: [
        {
            grade: Number,
            userId: String,
        }],
    averageRating: { type: Number }
})

//EXPORT MODEL BOOK
module.exports = mongoose.model('Book', bookSchema);