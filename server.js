require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require("./models/product_model");
const userRoutes = require('../models/user_model');
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api', userRoutes);
app.use('/api', productRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
