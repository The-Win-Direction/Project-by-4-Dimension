const mongoose = require('mongoose');

const cropLogSchema = new mongoose.Schema({
  khet: { type: mongoose.Schema.Types.ObjectId, ref: 'Khet', required: true },
  cropName: String,
  variety: String,
  sowingDate: Date,
  harvestDate: Date,
  photo: String,
  observations: String
}, { timestamps: true });

module.exports = mongoose.model('CropLog', cropLogSchema);
