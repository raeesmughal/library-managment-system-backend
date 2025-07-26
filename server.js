const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db.js');
const errorHandler = require('./middleware/errorHandler.js')



const app = express();
dotenv.config();
connectDB()


// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(errorHandler);


// ========== Routes ===========

const authRoutes = require('./routes/authRoutes.js');
const bookRoutes = require('./routes/bookRoutes.js');


app.use('/api/auth', authRoutes);
app.use('/api/book', bookRoutes);



// server start
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`server is running at : http://localhost:${PORT}`);
});