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
    Reader.find((err, readers) => {
      if (err) {
        res.json(err);
      } else {
        res.json(readers);
      }
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.get('/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
  let token = getToken(req.headers);
  if (token) {
    Reader.findById(req.params.id).exec((err, reader) => {
      if (err) {
        res.json(err);
      } else {
        res.json(reader);
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