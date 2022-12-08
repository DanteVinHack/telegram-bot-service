const User = require('../../models/User');
const Rate = require('../../models/Rate');
const Order = require('../../models/Order');
const Setting = require('../../models/Setting')

module.exports = async (bot, chatId, user, wallet, _id) => {
  try {
    const rate = await Rate.findOne({ _id });
  
    user.billId = wallet.generateId();
    await User.updateOne({_id: user._id}, {$set: user})
    
    const params = {
      publicKey: wallet.publicKey,
      amount: rate.price,
      billid: user.billId,
    }

    const url = wallet.createPaymentForm(params);
  
    await bot.sendMessage(chatId, 'Оплачено', {
      reply_markup: {
        inline_keyboard: [
          [{text: '✅ Ссылка на оплату', url}],
          [{text: '⏳ Проверка опаты', callback_data: `check&${user._id}`}]
        ]
      }
    })

    const date = new Date()

    const order = new Order({
      username: user.username,
      rate: rate.title,
      registerDate: `${date.getMonth()}/${date.getDate()}/${date.getYear()}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} PM`,
      amount: rate.price,
      paid: false
    })

    await order.save()
    
  } catch (error) {
    console.log(error.message)
  }

} 