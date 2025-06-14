const mongoose = require('mongoose');

const economicLogSchema = new mongoose.Schema({
  khet: { type: mongoose.Schema.Types.ObjectId, ref: 'Khet', required: true },
  costType: String,        // Seeds, Fertilizer, Labor, etc.
  amount: Number,
  description: String,
  yield: String,           // e.g., "100 kg"
  salePrice: Number,       // ₹/kg or ₹/quintal
  buyerMarket: String,
  profitOrLoss: String     // Optional or derived
}, { timestamps: true });

module.exports = mongoose.model('EconomicLog', economicLogSchema);
