// Node package
const fs = require("fs");

// uuid
const { v4 } = require("uuid");

// models
const Setting = require("../../models/Setting");
const User = require("../../models/User");

module.exports = bot => {
  return async ({ chat }) => {
    try {
      const chatId = chat.id;
      const settings = await Setting.findOne();

      console.log(settings);
      if (settings?.startImagePath) {
        const image = fs.readFileSync(settings?.startImagePath);
        await bot.sendPhoto(chatId, image);
      }

      await bot.sendMessage(chatId, settings.startText, {
        reply_markup: {
          keyboard: [
            [
              { text: "💵 Приобрести доступ" },
              { text: "⌛️ Купленные тарифы" },
            ],
            [{ text: "👩🏻‍💻 Тех. поддержка" }],
          ],
          resize_keyboard: true,
        },
      });

      if (!(await User.findOne({ chatId }))) {
        const date = new Date();

        const user = new User({
          username: chat.username || chat.first_name,
          balance: 0,
          rates: [],
          registerDate: `${date.getMonth()}/${date.getDate()}/${date.getYear()}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} PM`,
          chatId: chatId,
          billId: v4(),
        });

        await user.save();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};
