const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  stock: { type: String, required: true },
  status: { type: Number, required: true },
});

module.exports = mongoose.model('product', productSchema);