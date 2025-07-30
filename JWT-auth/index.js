const express = require('express')
const mongoose = require('mongoose')
const MONGO_URI = 'mongodb://localhost:27017/jwt-node';

const product = require('./routes/productRoute')
const order = require('./routes/orderRoute')

const app = express()
app.use(express.json())

mongoose.connect(MONGO_URI)
.then(()=>console.log('MongoDB connected successfully'))
.catch(err=>console.error(err))


app.use('/products', product);
app.use('/orders', order)

app.listen(3000, ()=>console.log('Server running on port 3000'))