const express = require('express');
const router = express.Router();
let Book = require('../models/Book');

var passport = require('passport');
require('../config/passport')(passport);

//Get Books
router.get('/', passport.authenticate('jwt', { session: false}), (req, res) => {
  let token = getToken(req.headers);
  if (token) {
    Book.find((err, books) => {
      if (err) {
        res.json(err);
      } else {
        res.json(books);
      }
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

//Add Book
router.post('/', passport.authenticate('jwt', { session: false}), (req, res) => {
  let token = getToken(req.headers);
  if (token) {
    let book = new Book(req.body);
    book.save()
      .then(() => {
        res.status(201).send();
      })
      .catch(() => {
        res.status(400).send("unable to save to database");
      });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

//Delete Book
router.delete('/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
  let token = getToken(req.headers);
  if (token) {
    Book.findByIdAndRemove({_id: req.params.id}, function(err){
      if(err) res.json(err);
      else res.json('Successfully removed');
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};


module.exports = router;