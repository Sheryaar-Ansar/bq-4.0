require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const orderRoute = require('./routes/orderRoute')
const productRoute = require('./routes/productRoute')
const userRoute = require('./routes/userRoute')

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('MONGODB CONNECTED SUCCESSFULLY'))
.catch(err=>console.error(err))

app.use(express.json())

app.use('/auth', userRoute)
app.use('/products', productRoute)
app.use('/orders', orderRoute)

app.listen(3000, ()=> {
    console.log('Server running on port 3000');
    
})
