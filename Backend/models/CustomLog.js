const mongoose = require('mongoose');

const customLogSchema = new mongoose.Schema({
  khet: { type: mongoose.Schema.Types.ObjectId, ref: 'Khet', required: true },
  title: String,
  description: String,
  date: Date,
  photo: String
}, { timestamps: true });

module.exports = mongoose.model('CustomLog', customLogSchema);
