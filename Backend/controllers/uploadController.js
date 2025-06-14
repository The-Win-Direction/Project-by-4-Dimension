const cloudinary = require('../config/cloudinaryConfig');
const fs = require('fs');

const uploadToCloudinary = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'khet-tracker',
    });

    fs.unlinkSync(req.file.path); // delete local file after upload

    res.status(200).json({
      message: 'Upload successful!',
      fileUrl: result.secure_url,
      publicId: result.public_id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Upload failed' });
  }
};

module.exports = { uploadToCloudinary };
