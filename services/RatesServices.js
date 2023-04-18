const Rate = require('../models/Rate')

class RatesServices {
	async getAll() {
		return Rate.find()	
	}

	async createRate(rate) {
		const newRate = new Rate(rate)

		await newRate.save()
		return newRate
	}
}

module.exports = new RatesServices()
