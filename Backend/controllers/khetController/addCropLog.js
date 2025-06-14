const CropLog = require('../../models/CropLog');
const uploadToCloudinary = require('../../middleware/uploadMiddleware');

const addCropLog = async (req, res) => {
  try {
    const { khet, cropName, variety, sowingDate, harvestDate, observations } = req.body;

    let photoUrl = '';
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'crop_logs');
      photoUrl = result.secure_url;
    }

    const cropLog = await CropLog.create({
      khet,
      cropName,
      variety,
      sowingDate,
      harvestDate,
      photo: photoUrl,
      observations,
    });

    res.status(201).json({ success: true, data: cropLog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = addCropLog;
