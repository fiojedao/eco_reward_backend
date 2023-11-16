const express = require("express");
const router = express.Router();

const ecoCoinsController = require("../controllers/ecoCoinsController");

// Ruta para obtener la lista de address
router.get("/", ecoCoinsController.getAll);

router.get("/:id", ecoCoinsController.getById);

router.get("/getByClientId/:id", ecoCoinsController.getByClientId);

router.post("/", ecoCoinsController.create);

router.put("/:id", ecoCoinsController.update);


module.exports = router;
