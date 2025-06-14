const mongoose = require('mongoose');

const irrigationLogSchema = new mongoose.Schema({
  khet: { type: mongoose.Schema.Types.ObjectId, ref: 'Khet', required: true },
  waterSource: String,
  date: Date,
  quantity: String, // e.g., "3 hours", "500L"
  issues: String,
  photo: String
}, { timestamps: true });

module.exports = mongoose.model('IrrigationLog', irrigationLogSchema);
