const mongoose = require('mongoose');

const pestLogSchema = new mongoose.Schema({
  khet: { type: mongoose.Schema.Types.ObjectId, ref: 'Khet', required: true },
  problem: String,
  dateObserved: Date,
  actionTaken: String,
  result: String,
  photo: String
}, { timestamps: true });

module.exports = mongoose.model('PestLog', pestLogSchema);
