const OrdersService = require('../services/OrdersService')

class OrdersController {
	async getAll(req, res) {
		try {
			const orders = await OrdersService.getAll()

			return res.status(200).json(orders);
		} catch(error) {
			return res.status(500).json(error.message)
		}
	}
}

module.exports = new OrdersController()
