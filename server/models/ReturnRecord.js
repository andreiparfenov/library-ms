const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ReturnRecord = new Schema({
  reader: { type: Schema.Types.ObjectId, ref: 'Reader' },
  returnDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  books: [
    { type: Schema.Types.ObjectId, ref: 'Book' }
  ]
});

module.exports = mongoose.model('ReturnRecord', ReturnRecord);