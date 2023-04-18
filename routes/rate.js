const RateController = require('../controllers/RateController')

const Router = require("express");
const router = Router();

router.get("/:id", RateController.getById);

router.put("/", RateController.updateById);

router.put("/replace", RateController.replace);

router.delete("/:id", RateController.deleteById);

module.exports = { name: "rate", router };
