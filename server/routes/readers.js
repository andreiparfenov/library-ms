const express = require('express');
const router = express.Router();
let Book = require('../models/Book');
let Reader = require('../models/Reader');

var passport = require('passport');
require('../config/passport')(passport);

//Get readers
router.get('/', passport.authenticate('jwt', { session: false}), (req, res) => {
  let token = getToken(req.headers);
  if (token) {
    Reader.find((err, books) => {
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

router.post('/', passport.authenticate('jwt', { session: false}), (req, res) => {
  let token = getToken(req.headers);
  if (token) {
    let reader = new Reader(req.body);
    reader.save()
      .then(() => {
        res.status(201).send();
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send("unable to save to database");
      });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

module.exports = router;