const User = require('../models/User')

class UserServices {
	async getAll() {
		return await User.find()
	}	
	
	async deleteAll() { 
		return await User.deleteMany({})
	}

	async deleteById(_id) { 
		return await User.deleteOne({ _id })
	}
}

module.exports = new UserServices()
