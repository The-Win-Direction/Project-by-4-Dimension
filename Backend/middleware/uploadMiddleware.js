const cloudinary = require('../config/cloudinaryConfig');

const uploadToCloudinary = async (fileBuffer, folderName) => {
  try {
    const base64 = fileBuffer.toString('base64');
    const dataURI = 'data:image/jpeg;base64,' + base64;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: folderName,
    });

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = uploadToCloudinary;
