const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/", userController.get);

router.get("/administrators", userController.getAdministrators);

router.get("/:id", userController.getById);

router.get('/:id/coupons', userController.getUserCouponExchange);

module.exports = router;
