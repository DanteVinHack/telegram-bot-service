const UserServices = require('../services/UserServices')

class UserController {
	async getAll(req, res) {
		try {
			const users = await UserServices.getAll()

			res.status(200).json(users)
		} catch(error) {
			return res.status(500).json(error.message)
		}
	}

	async deleteAll(req, res) {
		try {
			await UserServices.deleteAll();

			res.status(200).json('Все пользователи успешно удалены')
		} catch(error) {
			return res.status(500).json(error.message)
		}
	}

	async deleteById(req, res) {
		try {
			const { id } = req.params;

			await UserServices.deleteById(id)

			res.status(200).json(id)
		} catch(error) {
			return res.status(500).json(error.message)
		}
	}
}

module.exports = new UserController()
