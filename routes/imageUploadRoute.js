const express = require('express');
const router = express.Router();

const imageUploadController = require('../controllers/imageUploadController');
const imageUploadMiddleware = require('../service/imageUploadService');

router.post('/', imageUploadMiddleware, imageUploadController.imageUploadService);

module.exports = router;
