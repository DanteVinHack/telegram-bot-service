const { Schema, model } = require('mongoose');

const schema = new Schema({
  token: String,
  publicKey: String,
  secretKey: String,
  startImage: String,
  startText: String
})

module.exports = model('Setting', schema)