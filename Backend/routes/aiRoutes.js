const express = require("express");
const router = express.Router();
const aiController = require("../controllers/aiController/index");
const auth = require("../middleware/authMiddleware");

// Per-log analysis
router.post("/analyze/crop/:khetId", auth, aiController.analyzeCropLogs);
router.post("/analyze/soil/:khetId", auth, aiController.analyzeSoilLogs);
router.post("/analyze/irrigation/:khetId", auth, aiController.analyzeIrrigationLogs);
router.post("/analyze/pest/:khetId", auth, aiController.analyzePestLogs);
router.post("/analyze/economic/:khetId", auth, aiController.analyzeEconomicLogs);
router.post("/analyze/custom/:khetId", auth, aiController.analyzeCustomLogs);

// Full analysis
router.post("/analyze/overall/:khetId", auth, aiController.analyzeAllLogs);

module.exports = router;
