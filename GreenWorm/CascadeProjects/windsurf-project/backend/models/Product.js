const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  images: [{
    data: Buffer,
    contentType: String,
    filename: String
  }],
  category: {
    type: String,
    enum: ['men', 'women', 'kids', 'accessories'],
    required: true
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  size: String,
  color: String,
  brand: String,
  material: String,
  dftImage: {
    data: Buffer,
    contentType: String,
    filename: String
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
