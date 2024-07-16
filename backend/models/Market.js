const mongoose = require('mongoose');

<<<<<<< HEAD
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
  password: {
    type: String,
    required: true,
  },
  WinningOption: {
    type: String,
    required: false,
  }
=======
const marketSchema = new mongoose.Schema({
  description: String,
  numOptions: Number,
  options: [String],
  password: String, 
  bets: { type: Map, of: Object, default: {} },
  resolved: { type: Boolean, default: false },
  winningOption: { type: String, default: null }
>>>>>>> d13a3b1d37b8146b5e9bfd174ab2a1c98e82417f
});

module.exports = mongoose.model('Market', marketSchema);
