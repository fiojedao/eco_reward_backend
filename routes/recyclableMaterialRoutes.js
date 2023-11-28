const express = require("express");
const router = express.Router();

const recyclableMaterialController = require("../controllers/recyclableMaterialController");

router.get("/", recyclableMaterialController.get);

router.get("/:id", recyclableMaterialController.getById);

router.get("/center/:id", recyclableMaterialController.getMaterialByCenter);

router.post("/", recyclableMaterialController.create);

router.put("/:id", recyclableMaterialController.update);

router.delete("/:id", recyclableMaterialController.delete);

module.exports = router;
