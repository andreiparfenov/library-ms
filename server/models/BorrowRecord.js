const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BorrowRecord = new Schema({
  reader: { type: Schema.Types.ObjectId, ref: 'Reader' },
  borrowDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  books: [
    { type: Schema.Types.ObjectId, ref: 'Book' }
  ],
  returnDate: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('BorrowRecord', BorrowRecord);