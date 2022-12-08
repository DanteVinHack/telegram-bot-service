const { v4 } = require('uuid');
const Setting = require('../../models/Setting')
const User = require('../../models/User');

module.exports = (bot, image) => {

  return async ({ chat }) => {
    try {
      const chatId = chat.id;
      const { startText } = await Setting.findOne()
  
      await bot.sendMessage(chatId, startText, {
        reply_markup: {
          keyboard: [
            [{text: '💵 Приобрести доступ' }, {text: '⌛️ Купленные тарифы' }],
            [{text: '👩🏻‍💻 Тех. поддержка'}]
          ],
          resize_keyboard: true
        }
      });
      
      if (!await User.findOne({chatId})) {
        const date = new Date();
  
        const user = new User({
          username: chat.username || chat.first_name,
          balance: 0,
          rates: [],
          registerDate: `${date.getMonth()}/${date.getDate()}/${date.getYear()}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} PM`,
          chatId: chatId,
          billId: v4()
        })
  
        await user.save()

      }
    } catch (error) {
      console.log(error.message)
    }
  }
}