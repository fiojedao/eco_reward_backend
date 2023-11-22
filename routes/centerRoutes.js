const express = require("express");
const router = express.Router();

const centerController = require("../controllers/centerController");

router.post("/", centerController.create);

router.get("/", centerController.get);

router.get("/material", centerController.getMaterial);

router.get("/:id", centerController.getById);

router.get("/user/:id", centerController.getByUserId);

router.put("/:id", centerController.update);

module.exports = router;
