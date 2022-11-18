const getKeyboard = require('./getKeyboard');

module.exports = async (bot, chat_id, message_id) => {
  await bot.editMessageText('Товары', {
    message_id, chat_id
  })
  await bot.editMessageReplyMarkup({
    inline_keyboard: await getKeyboard()
  }, {
    message_id, chat_id
  })
}