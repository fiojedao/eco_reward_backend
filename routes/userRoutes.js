const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/", userController.get);

router.get("/validateEmail/:email", userController.existUser);

router.get("/role/:id", userController.getUserByRole);

router.get("/:id", userController.getById);

router.get('/:id/coupons', userController.getUserCouponExchange);

router.post('/', userController.create);

router.post('/login/', userController.login);

router.put('/update/status/:id', userController.updateUserStatus);

router.put('/:id', userController.updateUser);

module.exports = router;
