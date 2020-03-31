const express = require('express');
const router = express.Router();
let Book = require('../models/Book');

//Get Books
router.get('/', (req, res) => {
  Book.find((err, books) => {
    if (err) {
      res.json(err);
    } else {
      res.json(books);
    }
  });
});

//Add Book
router.post('/', (req, res) => {
  let book = new Book(req.body);
  book.save()
    .then(() => {
      res.status(201).send();
    })
    .catch(() => {
      res.status(400).send("unable to save to database");
    });
});

//Delete Book
router.delete('/:id', (req, res) => {
  Book.findByIdAndRemove({_id: req.params.id}, function(err){
    if(err) res.json(err);
    else res.json('Successfully removed');
});
});


module.exports = router;