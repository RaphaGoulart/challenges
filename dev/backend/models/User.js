
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  login: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  }
});

module.exports = mongoose.model('users', userSchema);
