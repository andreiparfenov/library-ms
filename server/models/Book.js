const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Book
let Book = new Schema({
  isbn: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  publisher: {
    type: String,
    required: true
  },
  price: {
    type: Number,
  },
  publishYear: {
    type: Number,
    required: true
  },
  gotBy: {
    type: String,
    required: true
  },
  catalog: { type: Schema.Types.ObjectId, ref: 'Catalog' },
  status: {
    type: String,
    required: true
  },
  gotDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Book', Book);