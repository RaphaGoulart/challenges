
const express = require('express');
const router = express.Router();

const Threat = require('../models/Threat');

router.post('/new', (req, res) => {

  const newThreat = new Threat({
    location: {
      type: "Point",
      coordinates: [req.body.location[0].lat, req.body.location[0].lng]
    }, 
    dangerLevel: req.body.dangerLevel,
    monsterName: req.body.monsterName,
  });

  newThreat
    .save()
    .then(result => {
      res.json(result);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get('/list', (req, res) => {

  Threat.find()
    .then(threats => {
      res.json(threats);
    })
    .catch(error => {
      res.status(500).json(error)
    });

});

module.exports = router;
