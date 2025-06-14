const Khet = require('../../models/Khet');
const CropLog = require('../../models/CropLog');
const SoilLog = require('../../models/SoilLog');
const IrrigationLog = require('../../models/IrrigationLog');
const PestLog = require('../../models/PestLog');
const EconomicLog = require('../../models/EconomicLog');
const CustomLog = require('../../models/CustomLog');

const uploadToCloudinary = require('../../middleware/uploadMiddleware');

// Create a new Khet
exports.createKhet = async (req, res) => {
  try {
    let photoUrl = null;
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'khet_photos');
      photoUrl = result.secure_url;
    }

    const khet = new Khet({
      user: req.user._id,
      name: req.body.name,
      area: req.body.area,
      location: {
        province: req.body.province,
        district: req.body.district,
        gps: {
          lat: req.body.lat,
          lng: req.body.lng
        }
      },
      soilType: req.body.soilType,
      irrigationSource: req.body.irrigationSource,
      ownership: req.body.ownership,
      photo: photoUrl,
      enabledTracking: {
        crop: req.body.crop || false,
        soil: req.body.soil || false,
        irrigation: req.body.irrigation || false,
        pest: req.body.pest || false,
        economic: req.body.economic || false,
        custom: req.body.custom || false
      }
    });

    await khet.save();
    res.status(201).json(khet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add Crop Log
exports.addCropLog = async (req, res) => {
  try {
    let photoUrl = null;
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'crop_logs');
      photoUrl = result.secure_url;
    }

    const log = new CropLog({
      khet: req.params.khetId,
      cropName: req.body.cropName,
      variety: req.body.variety,
      sowingDate: req.body.sowingDate,
      harvestDate: req.body.harvestDate,
      photo: photoUrl,
      observations: req.body.observations
    });

    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add Soil Log
exports.addSoilLog = async (req, res) => {
  try {
    let photoUrl = null;
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'soil_logs');
      photoUrl = result.secure_url;
    }

    const log = new SoilLog({
      khet: req.params.khetId,
      soilTestReport: req.body.soilTestReport,
      fertilizerUsed: req.body.fertilizerUsed,
      compostUsed: req.body.compostUsed,
      organicPractices: req.body.organicPractices,
      photo: photoUrl
    });

    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add Irrigation Log
exports.addIrrigationLog = async (req, res) => {
  try {
    let photoUrl = null;
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'irrigation_logs');
      photoUrl = result.secure_url;
    }

    const log = new IrrigationLog({
      khet: req.params.khetId,
      waterSource: req.body.waterSource,
      date: req.body.date,
      quantity: req.body.quantity,
      issues: req.body.issues,
      photo: photoUrl
    });

    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add Pest Log
exports.addPestLog = async (req, res) => {
  try {
    let photoUrl = null;
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'pest_logs');
      photoUrl = result.secure_url;
    }

    const log = new PestLog({
      khet: req.params.khetId,
      problem: req.body.problem,
      dateObserved: req.body.dateObserved,
      actionTaken: req.body.actionTaken,
      result: req.body.result,
      photo: photoUrl
    });

    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add Economic Log
exports.addEconomicLog = async (req, res) => {
  try {
    const log = new EconomicLog({
      khet: req.params.khetId,
      costType: req.body.costType,
      amount: req.body.amount,
      description: req.body.description,
      yield: req.body.yield,
      salePrice: req.body.salePrice,
      buyerMarket: req.body.buyerMarket,
      profitOrLoss: req.body.profitOrLoss
    });

    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add Custom Log
exports.addCustomLog = async (req, res) => {
  try {
    let photoUrl = null;
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'custom_logs');
      photoUrl = result.secure_url;
    }

    const log = new CustomLog({
      khet: req.params.khetId,
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      photo: photoUrl
    });

    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
