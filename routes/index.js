const ratesRouter = require('./rates');
const rateRouter = require('./rate');
const settingsRouter = require('./settings');
const usersRouter = require('./users');
const linksRouter = require('./links')
const ordersRouter = require('./orders');

module.exports = [
  ratesRouter,
  rateRouter,
  settingsRouter,
  usersRouter,
  linksRouter,
  ordersRouter
]