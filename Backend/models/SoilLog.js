const mongoose = require('mongoose');

const soilLogSchema = new mongoose.Schema({
  khet: { type: mongoose.Schema.Types.ObjectId, ref: 'Khet', required: true },
  soilTestReport: String, // File/photo URL
  fertilizerUsed: { type: String }, // "Urea - 10kg"
  compostUsed: { type: String }, // "Cow dung - 20kg"
  organicPractices: String,
  photo: String
}, { timestamps: true });

module.exports = mongoose.model('SoilLog', soilLogSchema);
