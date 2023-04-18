const RatesServices = require('../services/RatesServices')

class RatesController {
	async getAll(req, res) {
		try {
			const rates = await RatesServices.getAll()

			return res.status(200).json(rates)
		} catch (error) {
			return res.status(500).json(error.message)
		}
	}

	async createRate(req, res) {
		try {
			const newRate = await RatesServices.createRate(req.body);

			res.status(201).json(newRate)
		} catch (error) {
			return res.status(500).json(error.message)
		}
	}
}

module.exports = new RatesController()
