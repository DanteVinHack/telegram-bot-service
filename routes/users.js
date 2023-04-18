const UserController = require('../controllers/UserController');

const Router = require('express');
const router = Router();


router.get('/', UserController.getAll)

router.delete('/:id', UserController.deleteById)

router.delete('/all', UserController.deleteAll)


module.exports = {name: 'users', router};
