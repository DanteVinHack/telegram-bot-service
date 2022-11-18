const User = require('../../models/User');
// const Order = require('../../models/Order');

module.exports = async (bot, callback_query, wallet, _id) => {
  try {
    const { billId } = await User.findOne({ _id });

    console.log('check paid', billId)

    const response = await wallet.getBillInfo(billId);
  
    console.log(response)
  } catch (error) {
    console.error(error.message)    
    bot.answerCallbackQuery(callback_query, '❌ Вы не оплатили товар', true)
  }
}