const express = require("express");
const router = express.Router();

const materialExchangeController = require("../controllers/materialExchangeController");

router.get("/", materialExchangeController.get);

router.get("/:id", materialExchangeController.getById);

module.exports = router;
