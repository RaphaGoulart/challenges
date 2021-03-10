
const mongoose = require('mongoose');
const { Schema } = mongoose;

const heroSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  location: {
    type: { type: String },
    coordinates: [Number],
  },
  class: {
    type: String,
    require: true
  },
  allocated: {
    type: Boolean,
    default: false
  }
});

heroSchema.index({ location: "2dsphere" });

module.exports = mongoose.model('heroes', heroSchema);
