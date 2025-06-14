const mongoose = require('mongoose');

const khetSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  area: { type: String, required: true }, // e.g., "2 bigha", "1.5 hectare"
  location: {
    province: String,
    district: String,
    gps: {
      lat: Number,
      lng: Number
    }
  },
  soilType: String,
  irrigationSource: String,
  ownership: { type: String, enum: ['Owned', 'Leased'] },
  photo: String
}, { timestamps: true });

module.exports = mongoose.model('Khet', khetSchema);
