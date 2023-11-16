const express = require("express");
const router = express.Router();

const couponExchangeController = require("../controllers/couponExchangeController");

// Ruta para obtener la lista de address
router.get("/", couponExchangeController.getAllCoupons);

router.get("/:id", couponExchangeController.getCouponById);

router.post("/", couponExchangeController.createCoupon);

router.put("/:id", couponExchangeController.updateCoupon);

router.delete("/:id", couponExchangeController.deleteCoupon);

module.exports = router;
