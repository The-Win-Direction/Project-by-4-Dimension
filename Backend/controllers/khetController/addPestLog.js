const PestLog = require('../../models/PestLog');
const uploadToCloudinary = require('../../middleware/uploadMiddleware');

const addPestLog = async (req, res) => {
  try {
    const { khet, problem, dateObserved, actionTaken, result } = req.body;

    let photoUrl = '';
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'pest_logs');
      photoUrl = result.secure_url;
    }

    const pestLog = await PestLog.create({
      khet,
      problem,
      dateObserved,
      actionTaken,
      result,
      photo: photoUrl
    });

    res.status(201).json({ success: true, data: pestLog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = addPestLog;
