const Order = require('../models/Order')

class OrderService {
	async getAll() {
		return await Order.find(); 
	}
}

module.exports = new OrderService()
