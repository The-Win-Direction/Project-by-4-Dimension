const Khet = require('../../models/Khet');
const CropLog = require('../../models/CropLog');
const SoilLog = require('../../models/SoilLog');
const IrrigationLog = require('../../models/IrrigationLog');
const PestLog = require('../../models/PestLog');
const EconomicLog = require('../../models/EconomicLog');
const CustomLog = require('../../models/CustomLog');

// Fetch all khets for the logged-in user
exports.getUserKhets = async (req, res) => {
  try {
    const khets = await Khet.find({ user: req.user._id });
    res.json(khets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Generic function to fetch logs with pagination
const getLogs = (Model) => async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const khetId = req.params.khetId;

  try {
    // Optional: verify khet ownership
    const khet = await Khet.findOne({ _id: khetId, user: req.user._id });
    if (!khet) return res.status(403).json({ message: 'Unauthorized access to Khet' });

    const logs = await Model.find({ khet: khetId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Model.countDocuments({ khet: khetId });

    res.json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(total / limit),
      logs
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Export handlers for each log
exports.getCropLogs = getLogs(CropLog);
exports.getSoilLogs = getLogs(SoilLog);
exports.getIrrigationLogs = getLogs(IrrigationLog);
exports.getPestLogs = getLogs(PestLog);
exports.getEconomicLogs = getLogs(EconomicLog);
exports.getCustomLogs = getLogs(CustomLog);
