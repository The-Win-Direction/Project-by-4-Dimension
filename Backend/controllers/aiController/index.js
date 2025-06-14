const Khet = require("../../models/Khet");
const CropLog = require("../../models/CropLog");
const SoilLog = require("../../models/SoilLog");
const IrrigationLog = require("../../models/IrrigationLog");
const PestLog = require("../../models/PestLog");
const EconomicLog = require("../../models/EconomicLog");
const CustomLog = require("../../models/CustomLog");

const callGemini = require("../../utils/callGemini");
const buildPrompt = require("../../utils/buildPrompt");

// Helper to fetch recent logs
const fetchLogs = async (Model, khetId, limit = 10) => {
  return await Model.find({ khet: khetId }).sort({ createdAt: -1 }).limit(limit).lean();
};

// Generic analyzer
const analyzeLog = (Model, logType) => async (req, res) => {
  try {
    const { khetId } = req.params;
    const { limit = 10, query } = req.body;

    const khet = await Khet.findOne({ _id: khetId, user: req.user._id });
    if (!khet) return res.status(403).json({ message: "Unauthorized access to Khet" });

    const logs = await fetchLogs(Model, khetId, limit);
    const prompt = buildPrompt(logType, logs, query);
    const result = await callGemini(prompt);

    res.json({ analysis: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// One API for each log type
exports.analyzeCropLogs = analyzeLog(CropLog, "crop");
exports.analyzeSoilLogs = analyzeLog(SoilLog, "soil");
exports.analyzeIrrigationLogs = analyzeLog(IrrigationLog, "irrigation");
exports.analyzePestLogs = analyzeLog(PestLog, "pest");
exports.analyzeEconomicLogs = analyzeLog(EconomicLog, "economic");
exports.analyzeCustomLogs = analyzeLog(CustomLog, "custom");

// Overall Analyzer
exports.analyzeAllLogs = async (req, res) => {
  try {
    const { khetId } = req.params;
    const { limit = 5, query } = req.body;

    const khet = await Khet.findOne({ _id: khetId, user: req.user._id });
    if (!khet) return res.status(403).json({ message: "Unauthorized access to Khet" });

    const logs = [
      ...await fetchLogs(CropLog, khetId, limit),
      ...await fetchLogs(SoilLog, khetId, limit),
      ...await fetchLogs(IrrigationLog, khetId, limit),
      ...await fetchLogs(PestLog, khetId, limit),
      ...await fetchLogs(EconomicLog, khetId, limit),
      ...await fetchLogs(CustomLog, khetId, limit)
    ];

    const prompt = buildPrompt("overall", logs, query);
    const result = await callGemini(prompt);

    res.json({ analysis: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
