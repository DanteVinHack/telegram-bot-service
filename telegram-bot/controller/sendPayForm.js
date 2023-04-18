const message = `
Для оплаты переходите по ссылке - https://www.donationalerts.com/r/alinatgs

Вводите точную сумму и название тарифа. После оплаты бот автоматически выдаст вам тариф.
`

module.exports = async (bot, chatId) => {
	await bot.sendMessage(chatId, message)
}
