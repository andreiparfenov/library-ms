const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for readers
let Reader = new Schema({
  name: {
    type: String,
    required: true
  },
  birthdate: {
    type: Date,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  /*
  borrowRecords: [
    { type: Schema.Types.ObjectId, ref: 'BorrowRecord' }
  ],
  returnRecords: [
    { type: Schema.Types.ObjectId, ref: 'ReturnRecord' }
  ]
  */
});

module.exports = mongoose.model('Reader', Reader);