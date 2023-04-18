const User = require('../models/User')
const Setting = require('../models/Setting')
const Router = require('express');
const router = Router();

// router.post("/", async (req, res) => {
// 	const macthedSetting = await Setting.findOne()

// 	if (!macthedSetting?.token) {
// 		return res.status(404).json("Вы не зарегистрировали токен в боте")
// 	}

// 	const { message } = req.body;
// 	const image = req.files?.image;
// 	const users = await User.find();

// 	users.forEach(async ({ chatId }) => {
// 		try {
// 			await bot.sendMessage(chatId, message);
// 			if (!image) return;
// 			await bot.sendPhoto(chatId, image.data);
// 		} catch (error) {
// 			console.log(error.message);
// 		}
// 	});

// 	return res.status(201).json("Сообщение было успешно отправлено всем пользователям");
// });


module.exports = {name: 'links', router}
