const Book = require('../models/Book.js');





const getBooks = async (req, res, next) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (er) {
        next(er);
    }
}

const addBook = async (req, res, next) => {
    try {
        const newBook = new Book(req.body);
        await newBook.save();
        res.status(200).json(newBook);
    } catch (er) {
        next(er)
    }
}



const deleteBook = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedBook = await Book.findByIdAndDelete(id);
        res.status(200).json({
            message: 'book deleted successfully',
        })
    } catch (er) {
        next(er)
    }
}


module.exports = { getBooks, addBook, deleteBook };