const Khet = require('../../models/Khet');
const uploadToCloudinary = require('../../middleware/uploadMiddleware');

const createKhet = async (req, res) => {
  try {
    const {
      name,
      area,
      location,
      soilType,
      irrigationSource,
      ownership,
      enabledTracking,
      user,
    } = req.body;

    let photoUrl = '';
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'khet_photos');
      photoUrl = result.secure_url;
    }

    const newKhet = await Khet.create({
      user,
      name,
      area,
      location: JSON.parse(location),
      soilType,
      irrigationSource,
      ownership,
      photo: photoUrl,
      enabledTracking: JSON.parse(enabledTracking),
    });

    res.status(201).json({ success: true, data: newKhet });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = createKhet;
