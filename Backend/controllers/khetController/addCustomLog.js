const CustomLog = require('../../models/CustomLog');
const uploadToCloudinary = require('../../middleware/uploadMiddleware');

const addCustomLog = async (req, res) => {
  try {
    const { khet, title, description, date } = req.body;

    let photoUrl = '';
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'custom_logs');
      photoUrl = result.secure_url;
    }

    const customLog = await CustomLog.create({
      khet,
      title,
      description,
      date,
      photo: photoUrl
    });

    res.status(201).json({ success: true, data: customLog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = addCustomLog;
