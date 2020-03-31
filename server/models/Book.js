const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Book
let Book = new Schema({
  title: {
    type: String
  }
},{
    collection: 'books'
});

module.exports = mongoose.model('Book', Book);