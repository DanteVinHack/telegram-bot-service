// Middleware
const handleStart = require("./controller/handleStart");
const handlerMessage = require("./controller/handleMessage");
const handleCallback = require("./controller/handleCallback");

// Router
const { router: linksRouter } = require("../routes/links");

// Models
const User = require("../models/User");

// Payment
const getQiwiPayment = require("./payment/getQiwiPayment");

// Packages
const TelegramBotApi = require("node-telegram-bot-api");

const startBot = async token => {
  try {
    const bot = new TelegramBotApi(token, { polling: true });

    console.log("Bot started...");

    bot.setMyCommands([
      { command: "/start", description: "Начало работы с ботом" },
    ]);

    const wallet = await getQiwiPayment();

    // Start message
    bot.onText(/\/start/, await handleStart(bot));

    bot.on("message", await handlerMessage(bot));

    // Callback
    bot.on("callback_query", await handleCallback(bot, wallet));

    bot.on("polling_error", () => {});

    // Router requests
    linksRouter.post("/", async (req, res) => {
      const { message } = req.body;
      const image = req.files?.image;
      const users = await User.find();

      users.forEach(async ({ chatId }) => {
        try {
          await bot.sendMessage(chatId, message);
          if (!image) return;
          await bot.sendPhoto(chatId, image.data);
        } catch (error) {
          console.log(error.message);
        }
      });

      res
        .status(201)
        .json("Сообщение было успешно отправлено всем пользователям");
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = startBot;
