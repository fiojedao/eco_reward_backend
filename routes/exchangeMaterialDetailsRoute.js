const express = require("express");
const router = express.Router();

const exchangeMaterialDetailsController = require("../controllers/exchangeMaterialDetailsController");

// Ruta para obtener la lista de address
router.get("/", exchangeMaterialDetailsController.getAllDetails);

router.get("/:id", exchangeMaterialDetailsController.getDetailsById);

router.post("/", exchangeMaterialDetailsController.createDetails);

router.put("/:id", exchangeMaterialDetailsController.updateDetails);

router.delete("/:id", exchangeMaterialDetailsController.deleteDetails);

module.exports = router;
