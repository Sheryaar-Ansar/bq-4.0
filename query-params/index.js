const express = require('express');
const mongoose = require('mongoose');
const MONGO_URI = 'mongodb://localhost:27017/query'
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(express.json());

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.listen(3000, () => console.log(`Server running on port 3000`));