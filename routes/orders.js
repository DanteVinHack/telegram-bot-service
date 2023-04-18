const OrdersController = require('../controllers/OrdersController')

const Router = require('express');
const router = Router();

router.get('/', OrdersController.getAll)


module.exports = {name: 'orders', router}
