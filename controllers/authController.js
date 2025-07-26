

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRE = process.env.JWT_EXPIRE;

const User = require('../models/User.js');




const signup = async (req, res, next) => {
    try {
        const { username, email, password, role } = req.body;

        if (!username || !email || !password || !role) {
            res.status(400).json({
                message: 'all fields are required'
            });
        };

        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400).json({
                message: 'user already exists',
            })
        }

        const user = new User({ username, email, password, role });
        await user.save();

        res.status(200).json({
            message: 'user created successfully',
        })
    } catch (er) {
        next(er)
    }
}


const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: 'user not found'
            })
        }

        const matchPassword = await user.comparePassword(password);

        if (!matchPassword) {
            return res.status(400).json({
                message: 'incorrect password',
            })
        }

        const payload = { id: user._id, role: user.role };

        const token = await jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE });

        res.status(200).json({ token });

    } catch (er) {
        next(er)
    }
}




const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (er) {
        next(er)
    }
}


module.exports = { signup, login, getUsers }