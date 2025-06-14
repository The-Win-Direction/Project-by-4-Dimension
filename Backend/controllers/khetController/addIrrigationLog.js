const IrrigationLog = require('../../models/IrrigationLog');
const uploadToCloudinary = require('../../middleware/uploadMiddleware');

const addIrrigationLog = async (req, res) => {
  try {
    const { khet, waterSource, date, quantity, issues } = req.body;

    let photoUrl = '';
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'irrigation_logs');
      photoUrl = result.secure_url;
    }

    const irrigationLog = await IrrigationLog.create({
      khet,
      waterSource,
      date,
      quantity,
      issues,
      photo: photoUrl
    });

    res.status(201).json({ success: true, data: irrigationLog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = addIrrigationLog;
