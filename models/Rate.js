const { Schema, model } = require('mongoose');

const schema = new Schema({
  title: {
    type: String,
  },
  body: {
    type: String,
  },
  price: {
    type: Number,
    default: 0
  },
  link: {
    type: String,
  }
})

module.exports = model('Rate', schema)