const express = require("express");
const router = express.Router();

const addressController = require("../controllers/addressController");

// Ruta para obtener la lista de address
router.get("/", addressController.getAll);

router.get("/getAllAddressesByUserId/:id", addressController.getAllAddressesByUserId);

router.get("/getByAddressId/:id", addressController.getByAddressId);

router.post("/", addressController.create);

router.put("/:id", addressController.update);

router.delete("/:id", addressController.delete);

module.exports = router;
