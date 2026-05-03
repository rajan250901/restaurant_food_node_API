const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const connectDb = require('./config/db');

dotenv.config();
//dotenv.config({path:'./}) agar env file kisi path ke andar ho
//connection db
connectDb();
const app = express();

app.use(express.json());
app.use(cors());
// app.use(morgan('dev'));
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/restaurant',restaurantRoutes);
app.use('/api/v1/categories',categoryRoutes);
app.use('/api/v1/orders', orderRoutes)

app.get('/', (req,res) => {
    return res.status(200).send("<h1>Hello world</h1>");
})

// const PORT = process.env.PORT || 5000;
const PORT = 5000;

app.listen(PORT,() => {
    console.log(`Server is listening on Port : ${PORT}`);
});

//morgan package : jo bhi API hit hoga woh display karwaayega
//dotenv package : 
//cors package :jab 2 server ko different ports se connect karna ho
//client ke data ko access karne ke liye json format mein
