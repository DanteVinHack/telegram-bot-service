const getKeyboard = require('./getKeyboard');

module.exports = bot => {

  return async msg => {
    const chatId = msg.chat.id;
    const { text } = msg;

    if (text.trim() === '/start') return;
  
    switch(text) {
      case '💵 Приобрести доступ':
          await bot.sendMessage(chatId, 'Товары', {
            reply_markup: {
              inline_keyboard: await getKeyboard()
            }
          })
        break
      case '⌛️ Купленные тарифы':
          await bot.sendMessage(chatId, 'У вас нет купленных тарифов')
        break
      case '👩🏻‍💻 Тех. поддержка':
          await bot.sendMessage(chatId, 'Написать о проблеме вы можете сюда darkhelper')
        break
      default: 
        await bot.sendMessage(chatId, 'Главное меню', {
          reply_markup: {
            keyboard: [
              [{text: '💵 Приобрести доступ' }, {text: '⌛️ Купленные тарифы' }],
              [{text: '👩🏻‍💻 Тех. поддержка'}]
            ],
            resize_keyboard: true
          }
        })
    }
  }
}