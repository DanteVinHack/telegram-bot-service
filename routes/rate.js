const Rate = require("../models/Rate");

const Router = require("express");
const router = Router();

router.get("/:id", async (req, res) => {
  const { id: _id } = req.params;

  const rate = await Rate.findOne({ _id });

  res.status(200).json(rate);
});

router.put("/", async (req, res) => {
  const rate = req.body;

  await Rate.updateOne({ _id: rate._id }, { $set: rate });

  res.status(201).json("Update");
});

router.put("/replace", async (req, res) => {
  const [currentRate, replacedRate] = req.body;

  await Rate.updateOne({ _id: currentRate._id }, { $set: currentRate });
  await Rate.updateOne({ _id: replacedRate._id }, { $set: replacedRate });
  res.status(201).json("Update");
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  await Rate.deleteOne({ _id: id });

  res.status(200).json("Успешно удалено");
});

module.exports = { name: "rate", router };
