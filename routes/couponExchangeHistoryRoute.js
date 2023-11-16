const express = require("express");
const router = express.Router();

const couponExchangeHistoryController = require("../controllers/couponExchangeHistoryController");

router.get("/", couponExchangeHistoryController.getAllCouponExchangeHistory);

router.get("/:id", couponExchangeHistoryController.getCouponExchangeHistoryById);

router.get("/getByUserId/:id", couponExchangeHistoryController.getCouponExchangeHistoryByClientUserId);

module.exports = router;
