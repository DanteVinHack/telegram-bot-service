const Rate = require('../models/Rate')

class RateServices {
	async getById(_id) {
		return await Rate.findOne({ _id });
	}

	async updateById(rate) {
		return await Rate.updateOne({ _id: rate._id }, { $set: rate });
	}

	async deleteById(_id) {
		await Rate.deleteOne({ _id });
	}

	async replace(currentRate, replacedRate) {
		await Rate.updateOne({ _id: currentRate._id }, { $set: currentRate });
		await Rate.updateOne({ _id: replacedRate._id }, { $set: replacedRate });
	}
}

module.exports = new RateServices()
