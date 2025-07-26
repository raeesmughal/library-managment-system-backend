const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGODB_URI);
        console.log('mongodb connected');
    } catch (er) {
        console.log(er.message);
        process.exit(1)
    }
}

module.exports = connectDB;