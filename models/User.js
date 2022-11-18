const { Schema, model } = require('mongoose');

const schema = new Schema({
  username: String,
  balance: Number,
  rates: Array,
  registerDate: String,
  chatId: Number,
  billId: String
})

module.exports = model('User', schema)