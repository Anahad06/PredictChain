const mongoose = require('mongoose');

const MarketSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  numOptions: {
    type: Number,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  bets: {
    type: Map,
    of: new mongoose.Schema({
      amount: Number,
      option: String,
      walletAddress: String,
    }),
    default: {},
  },
});

module.exports = mongoose.model('Market', MarketSchema);
