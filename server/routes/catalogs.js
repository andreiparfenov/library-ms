const express = require('express');
const router = express.Router();
let Catalog = require('../models/Catalog');

var passport = require('passport');
require('../config/passport')(passport);

//Get Catalogs
router.get('/', passport.authenticate('jwt', { session: false}), (req, res) => {
  let token = getToken(req.headers);
  if (token) {
    Catalog.find((err, catalogs) => {
      if (err) {
        res.json(err);
      } else {
        res.json(catalogs);
      }
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

//Add Catalog
router.post('/', passport.authenticate('jwt', { session: false}), (req, res) => {
  let token = getToken(req.headers);
  if (token) {
    let catalog = new Catalog(req.body);
    catalog.save()
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

//Delete Catalog
router.delete('/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
  let token = getToken(req.headers);
  if (token) {
    Catalog.findByIdAndRemove({_id: req.params.id}, function(err){
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