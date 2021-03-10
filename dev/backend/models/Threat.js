
const mongoose = require('mongoose');
const { Schema } = mongoose;

const Hero = require('./Hero');

const threatSchema = new Schema({
 location: {
    type: { type: String },
    coordinates: [Number],
  },
  dangerLevel: {
    type: String,
    require: true
  },
  monsterName: {
    type: String,
    require: true
  },
  hero: {
    type: String,
    default: null
  }
});

module.exports = mongoose.model('threats', threatSchema);
