const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/User');

router.post('/login', (req, res) => {

  User.findOne({login: req.body.login})
    .then(user => {
      
      if(user.password = req.body.password){

        let id = user._id
        const token = jwt.sign( { id }, 'SECRET_TOKEN', {
            expiresIn: 6000
        });
        return res.json({ auth: true, token: token });
      }
      res.status(500).json({message: 'Invalid credentials!'});
      
    })
    .catch(error => {
      res.status(500).json(error)
    });
});

router.post('/logout', function(req, res) {
    res.json({ auth: false, token: null });
})

module.exports = router;
