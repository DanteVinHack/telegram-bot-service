// Middleware
const editMessage = require('./changeMessage');
const toMainRates = require('./toMainRates');
const sendPayForm = require('./sendPayForm');

// Payment
const createPay = require('../payment/createPay');

// Models
const User = require('../../models/User');
const Rate = require('../../models/Rate');

module.exports = (bot, wallet) => {
  return async query => {
    try {
      const { data } = query;
      const { message_id } = query.message;
      const chatId = query.message.chat.id;

      // Edit rates
      if (data.length > 10 && !data.includes('&')) {
        const rate = await Rate.findOne({ _id: data });
        
        await editMessage(bot, chatId, message_id, rate.body, data);
        return;
      }

      // callback
      let [callback_data, id] = data.split('&');
      const user = await User.findOne({ chatId });

      switch (callback_data) {
        case 'back':
            await toMainRates(bot, chatId, message_id)
          break
        case 'pay':
            await sendPayForm(bot, chatId)
          break
        case 'qiwi':
            await createPay(bot, chatId, user, wallet, id)
          break
      }
  
    } catch (error) {
      console.log(error.message)      
    }
  }
}
