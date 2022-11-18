const Setting = require('../models/Setting');
const startBot = require('../telegram-bot')

const Router = require('express');
const router = Router();

router.get('/', async (req, res) => {
  const setting = await Setting.findOne();

  res.status(200).json(setting)
})

router.post('/', async (req, res) => {
  // const fileName = FileService.saveFile(req.files.startImage);
  const settings = req.body;
  let newSettings;

  if (settings._id) {
    newSettings = await Setting.findOne();

    if (newSettings.token !== settings.token) {
      startBot(settings.token, settings.startText, settings.startImage);
    }
    
    await Setting.updateOne({ _id: settings._id }, {$set: settings});
  } else {
    newSettings = new Setting(settings);

    startBot(newSettings.token, newSettings.startText, newSettings.startImage);

    await newSettings.save();
  }

  res.status(201)
})

module.exports = {name: 'settings', router};