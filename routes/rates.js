const Rate = require('../models/Rate');

const Router = require('express');
const router = Router();

router.get('/', async (req, res) => {
  const rates = await Rate.find()
  console.log(rates);

  res.status(200).json(rates)
})

router.post('/', async (req, res) => {
  const rate = req.body;
  const newRate = new Rate(rate);

  await newRate.save()

  res.status(201).json(newRate)
})


module.exports = {name: 'rates', router};
