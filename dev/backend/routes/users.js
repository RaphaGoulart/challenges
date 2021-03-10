
const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.post('/new', (req, res) => {
  const newUser = new User({
    name: req.body.name,
    login: req.body.login,
    password: req.body.password,
    email: req.body.email
  });

  newUser
    .save()
    .then(result => {
      res.json(result);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.put('/edit/:id', (req, res) => {
  const newData = { 
    name: req.body.name,
    login: req.body.login,
    password: req.body.password,
    email: req.body.email
  };

  User.findOneAndUpdate({ _id: req.params.id }, newData, { new: true })
    .then(user => {
      res.json(user);
    })
    .catch(error => {
      res.status(500).json(error)
    });
});

router.delete('/delete/:id', (req, res) => {
  User.findOneAndDelete({ _id: req.params.id })
    .then(user => {
      res.json(user);
    })
    .catch(error => {
      res.status(500).json(error)
    });
});

router.get('/list', (req, res) => {
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      res.status(500).json(error)
    });
});

module.exports = router;
