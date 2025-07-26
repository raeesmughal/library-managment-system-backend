const express = require('express');
const router = express.Router();
const { signup, login, getUsers } = require('../controllers/authController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');



router.post('/signup', signup);
router.post('/login', login);
router.get('/users', authMiddleware, isAdmin, getUsers);



module.exports = router;