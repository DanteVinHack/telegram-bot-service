const path = require("path");
const fs = require("fs");
const config = require("config");

const Setting = require("../models/Setting");
const startBot = require("../telegram-bot");

// Router init
const Router = require("express");
const router = Router();

router.get("/", async (req, res) => {
  let settings = await Setting.findOne();

  if (!settings) {
    settings = config.get("settings");
  }

  res.status(200).json(settings);
});

router.post("/", async (req, res) => {
  const settings = req.body;
  const startImage = req?.files?.image;

  let currentSettings = await Setting.findOne();

  const imagePath = path.resolve("static", "startImage.jpg");

  if (startImage && currentSettings?.startImagePath) {
    fs.unlinkSync(imagePath);
  }

  startImage?.mv(imagePath);
  settings.startImagePath = imagePath || "";

  if (settings._id) {
    const { token } = settings;

    if (currentSettings.token !== token) {
      startBot(token);
    }

    await Setting.updateOne({ _id: settings._id }, { $set: settings });
  } else {
    currentSettings = new Setting(settings);
    const { token } = currentSettings;

    if (token) {
      startBot(token);
    }

    await currentSettings.save();
  }

  res.status(201);
});

module.exports = { name: "settings", router };
