const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { uploadToCloudinary } = require('../controllers/uploadController');

// Multer config - store locally temporarily
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post('/upload', upload.single('image'), uploadToCloudinary);

module.exports = router;
