const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;



const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(400).json({
                message: 'headers not defined',
            })
        }

        const token = authHeader.split(' ')[1];
        const decode = jwt.verify(token, JWT_SECRET);
        req.user = decode;

        next();

    } catch (er) {
        res.status(400).json({
            message: 'invalid token'
        })
    }
}


const isAdmin = async (req, res, next) => {
    try {
        const role = req.user.role;
        if (role !== 'admin') {
            return res.status(403).json({
                message: 'access denied',
            })
        }
        next();
    } catch (er) {
        next(er);
    }
}


module.exports = { authMiddleware, isAdmin }