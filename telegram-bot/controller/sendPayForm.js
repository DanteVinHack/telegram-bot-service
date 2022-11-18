module.exports = async (bot, chatId, id) => {

  await bot.sendMessage(chatId, 'Выберите способ оплаты', {
    reply_markup: {
      inline_keyboard: [
        [
          {text: '🥝 Qiwi', callback_data: `qiwi&${id}`}, 
          {text: '💳 Банковская карта', callback_data: `qiwi&${id}`}
        ]
      ]
    }
  })
}