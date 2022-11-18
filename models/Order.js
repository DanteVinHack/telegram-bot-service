const { Schema, model } = require('mongoose');

const schema = new Schema({
  username: String,
  rate: String,
  registerDate: String,
  amount: Number,
  paid: Boolean
})

module.exports = model('Order', schema)