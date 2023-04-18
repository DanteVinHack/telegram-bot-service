const RateServices = require('../services/RateServices')

class RateController {
	async getById(req, res) {
		try {
			const { id: _id } = req.params;

			const rate = await RateServices.getById(_id)

			return res.status(200).json(rate);
		} catch(error) {
			return res.status(500).json(error.message)
		}
	} 

	async updateById(req, res) {
		try {
			const rate = req.body;

			await RateServices.updateById(rate)

			return res.status(201).json("Update");
		} catch(error) {
			return res.status(500).json(error.message)
		}
	}

	async deleteById(req, res) {
		try {
			const { id: _id } = req.params;

			RateServices.deleteById(_id)

			res.status(200).json("Успешно удалено");
		} catch(error) {
			return res.status(500).json(error.message)
		}
	}

	async replace(req, res) {
		try {
			const [currentRate, replacedRate] = req.body;

			await RateServices.replace(currentRate, replacedRate)

			return res.status(201).json("Update");
		} catch(error) {
			return res.status(500).json(error.message)
		}
	}
}

module.exports = new RateController()
