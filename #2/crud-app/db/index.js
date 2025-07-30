const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://localhost:27017/user'

mongoose.connect(MONGODB_URI)
.then(()=>console.log('MongoDB connected successfully on port 27017'))
.catch(err=>console.error('Failed to connect', err))