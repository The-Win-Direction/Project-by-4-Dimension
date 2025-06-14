const EconomicLog = require('../../models/EconomicLog');

const addEconomicLog = async (req, res) => {
  try {
    const {
      khet,
      costType,
      amount,
      description,
      yield: cropYield,
      salePrice,
      buyerMarket,
      profitOrLoss
    } = req.body;

    const economicLog = await EconomicLog.create({
      khet,
      costType,
      amount,
      description,
      yield: cropYield,
      salePrice,
      buyerMarket,
      profitOrLoss
    });

    res.status(201).json({ success: true, data: economicLog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = addEconomicLog;
