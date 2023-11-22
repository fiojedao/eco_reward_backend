const imageUploadService = require('../service/imageUploadService');

class ImageUploadController {
  // Método para manejar la subida de una sola imagen
  imageUploadService(req, res) {
    try {
      const { filename } = req.file;
      res.status(200).json({ message: 'Image uploaded successfully', filename });
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = new ImageUploadController();
