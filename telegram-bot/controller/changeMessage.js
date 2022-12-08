const Rate = require('../../models/Rate')

module.exports = async (bot, chat_id, message_id, text, id) => {
  const rate = await Rate.findOne({ body: text })

  const sendText = `
Тариф: ${rate.title}
Цена: ${rate.price}

Описание тарифа:

${text}
  `

  await bot.editMessageText(sendText, {
    message_id, chat_id
  })

  await bot.editMessageReplyMarkup({
    inline_keyboard: [
      [{text: '💵 Оплатить', callback_data: `pay&${id}`}],
      [{text: '👈 Назад', callback_data: 'back'}]
    ]
  }, {
    message_id, chat_id
  })

}