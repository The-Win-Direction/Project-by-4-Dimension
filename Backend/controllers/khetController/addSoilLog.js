const SoilLog = require('../../models/SoilLog');
const uploadToCloudinary = require('../../middleware/uploadMiddleware');

const addSoilLog = async (req, res) => {
  try {
    const {
      khet,
      soilTestReport,
      fertilizerUsed,
      compostUsed,
      organicPractices
    } = req.body;

    let photoUrl = '';
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'soil_logs');
      photoUrl = result.secure_url;
    }

    const soilLog = await SoilLog.create({
      khet,
      soilTestReport,
      fertilizerUsed,
      compostUsed,
      organicPractices,
      photo: photoUrl
    });

    res.status(201).json({ success: true, data: soilLog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = addSoilLog;
