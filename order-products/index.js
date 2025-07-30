const mongoose = require('mongoose');
const MONGO_URI = 'mongodb://localhost:27017/orderapp';

const express = require('express');
const app = express();

const orderRoute = require('./routes/orderRoute');
const productRoute = require('./routes/productRoute');

app.use(express.json());

mongoose.connect(MONGO_URI)
.then(()=>console.log('MongoDB connected successfully on Port 27017'))
.catch(err=>console.error(err))

app.use('/product', productRoute);
app.use('/order', orderRoute);

app.listen(3000, ()=>{
    console.log('Server running Port 3000');
})