// Middleware
const handleStart = require('./controller/handleStart')
const handlerMessage = require('./controller/handleMessage');
const handleCallback = require('./controller/handleCallback');

// Router
const { router: linksRouter } = require('../routes/links');

// Models
const User = require('../models/User');

// Payment
const getQiwiPayment = require('./payment/getQiwiPayment');

// Packages
const TelegramBotApi = require('node-telegram-bot-api');

const startBot = async (TOKEN, text, image) => {
  try {
    const bot = new TelegramBotApi(TOKEN, { polling: true });

    console.log('Bot started...')
    
    bot.setMyCommands([
      {command: '/start', description: 'Начало работы с ботом'}
    ])
    
    const wallet = await getQiwiPayment();

    // Start message
    bot.onText(/start/, await handleStart(bot, text, image))
    
    bot.on('message', await handlerMessage(bot))

    // Callback
    bot.on('callback_query', await handleCallback(bot, wallet))

    bot.on('polling_error', () => {})

    // Router requests
    linksRouter.post('/',  async (req, res) => {
      const { message } = req.body;
      const { image } = req.files;
      const users = await User.find();

      users.forEach(async ({chatId}) => {
        await bot.sendMessage(chatId, message);
        await bot.sendPhoto(chatId, image.data);
      })
    
      res.status(201).json('Сообщение было успешно отправлено всем пользователям')
    })

  } catch (error) {
    console.log(error)
  }
}

module.exports = startBot