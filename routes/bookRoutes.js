const router = require('express').Router();
const { getBooks, addBook, deleteBook } = require('../controllers/bookController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');



router.get('/books', getBooks);
router.post('/addbook', authMiddleware, isAdmin, addBook);
router.post('/deletebook/:id', authMiddleware, isAdmin, deleteBook);


module.exports = router;