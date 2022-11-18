const Rate = require('../../models/Rate');

const getKeyboard = async () => {
  const rates = await Rate.find();

  const ratesKeyboard = rates.map(rate => ([{text: rate.title, callback_data: rate._id}]))

  return ratesKeyboard;
}

module.exports = getKeyboard;