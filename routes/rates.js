const RatesController = require('../controllers/RatesController');

const Router = require('express');
const router = Router();

router.get('/', RatesController.getAll)


router.post('/', RatesController.createRate)


module.exports = {name: 'rates', router};
