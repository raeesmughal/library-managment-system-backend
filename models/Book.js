const { Schema, model } = require('mongoose');


const bookSchema = new Schema({
    name: String,
    author: String,
    isbn: String,
    copiesAvailable: Number
})


module.exports = model('Book', bookSchema);