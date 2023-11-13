const express = require("express");
const router = express.Router();

const materialExchangeController = require("../controllers/materialExchangeController");

router.get("/", materialExchangeController.get);

module.exports = router;
