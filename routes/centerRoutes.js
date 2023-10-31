const express = require("express");
const router = express.Router();

const centerController = require("../controllers/centerController");

router.get("/", centerController.get);
router.get("/material", centerController.get);

router.get("/:id", centerController.getById);

module.exports = router;
