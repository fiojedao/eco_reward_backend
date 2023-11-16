const express = require("express");
const router = express.Router();

const couponExchangeHistoryController = require("../controllers/couponExchangeHistoryController");

// Ruta para obtener la lista de address
router.get("/", couponExchangeHistoryController.getAllCouponExchangeHistory);

router.get("/:id", couponExchangeHistoryController.getCouponExchangeHistoryById);

router.get("/getByUserId/:id", couponExchangeHistoryController.getCouponExchangeHistoryByClientUserId);

module.exports = router;
