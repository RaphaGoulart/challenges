
const express = require('express');
const router = express.Router();

const Hero = require('../models/Hero');

router.post('/new', (req, res) => {

  const newHero = new Hero({
    name: req.body.name,
    location: {
      type: "Point",
      coordinates: [req.body.location[0].lat, req.body.location[0].lng]
    },  
    class: req.body.class
  });

  newHero
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
    location: {
      type: "Point",
      coordinates: [req.body.location[0].lat, req.body.location[0].lng]
    }, 
    class: req.body.class 
  };

  Hero.findOneAndUpdate({ _id: req.params.id }, newData, { new: true })
    .then(hero => {
      res.json(hero);
    })
    .catch(error => {
      res.status(500).json(error)
    });

});

router.delete('/delete/:id', (req, res) => {

  Hero.findOneAndDelete({ _id: req.params.id })
    .then(hero => {
      res.json(hero);
    })
    .catch(error => {
      res.status(500).json(error)
    });

});

router.get('/list', (req, res) => {

  Hero.find()
    .then(heroes => {
      res.json(heroes);
    })
    .catch(error => {
      res.status(500).json(error)
    });

});

router.put('/allocate/:id', (req, res) => {

  const newData = { 
    allocated: true
  };

  Hero.findOneAndUpdate({ _id: req.params.id }, newData, { new: true })
    .then(hero => {
      res.json(hero);
    })
    .catch(error => {
      res.status(500).json(error)
    });

});

router.put('/deallocate/:id', (req, res) => {

  const newData = { 
    allocated: false
  };

  Hero.findOneAndUpdate({ _id: req.params.id }, newData, { new: true })
    .then(hero => {
      res.json(hero);
    })
    .catch(error => {
      res.status(500).json(error)
    });

});

module.exports = router;
