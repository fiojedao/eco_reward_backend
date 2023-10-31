const express = require("express");
const router = express.Router();

const recyclableMaterialController = require("../controllers/recyclableMaterialController");

router.get("/", recyclableMaterialController.get);

module.exports = router;
