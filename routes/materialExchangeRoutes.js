const express = require("express");
const router = express.Router();

const materialExchangeController = require("../controllers/materialExchangeController");

router.get("/", materialExchangeController.get);

router.get("/:id", materialExchangeController.getById);

router.post("/", materialExchangeController.createMaterialExchange);

router.get("/exchangesByUserid/:id", materialExchangeController.getAllExchangesByUserId);

router.get("/center/:id", materialExchangeController.getAllExchangesByCenterId);

router.get("/admin/:id", materialExchangeController.getAllExchangesForAllCenters);

module.exports = router;
