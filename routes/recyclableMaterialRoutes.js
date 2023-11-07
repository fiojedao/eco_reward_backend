const express = require("express");
const router = express.Router();

const recyclableMaterialController = require("../controllers/recyclableMaterialController");

router.get("/", recyclableMaterialController.get);

router.get("/:id", recyclableMaterialController.getById);

module.exports = router;
