require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const User = require('./routes/userRoutes')

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log(`MongoDB connected successfully`))
.catch((err)=>console.error(err))

const app = express()

app.use(express.json())

app.use('/auth', User)

const PORT = 5000 || process.env.PORT
app.listen(PORT, ()=> console.log(`server running on ${PORT}`))
