const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads/')); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

class ImageUploadService {
  singleImageUploadMiddleware = upload.single('image');

  // Método para manejar la carga de una sola imagen
  uploadSingleImage(req, res, next) {
    this.singleImageUploadMiddleware(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: 'Error uploading image', details: err.message });
      } else if (err) {
        return res.status(500).json({ error: 'Internal Server Error', details: err.message });
      }
      next();
    });
  }
}

module.exports = new ImageUploadService();
