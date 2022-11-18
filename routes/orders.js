const Order = require('../models/Order');

const Router = require('express');
const router = Router();

router.get('/', async (req, res) => {
  const orders = await Order.find();

  res.status(200).json(orders);
})

module.exports = {name: 'orders', router}