module.exports = async (bot, chat_id, message_id, text, id) => {

  await bot.editMessageText(text, {
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