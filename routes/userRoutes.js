const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

// Ruta para obtener la lista de usuarios
router.get("/", userController.get);

router.get("/administrators", userController.getAdministrators);

// Ruta para obtener un usuario por ID
router.get("/:id", userController.getById);

router.get("/:id/coupon", userController.getUserCouponExchange);

/*
// Ruta anidada para obtener los cupones de un usuario por ID
router.get("/:id/coupons", userController.getUserCouponExchange); */

module.exports = router;
