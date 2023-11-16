const express = require("express");
const router = express.Router();

const materialExchangeController = require("../controllers/materialExchangeController");

router.get("/", materialExchangeController.get);

router.get("/:id", materialExchangeController.getById);

router.get("/exchangesByUserid/:id", materialExchangeController.getAllExchangesByUserId);

router.get("/administratorUserId/:id", materialExchangeController.getAllExchangesByAdministratorUserId);

module.exports = router;
