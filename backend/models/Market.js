const mongoose = require('mongoose');

const marketSchema = new mongoose.Schema({
  description: String,
  numOptions: Number,
  options: [String],
  password: String, 
  bets: { type: Map, of: Object, default: {} },
  resolved: { type: Boolean, default: false },
  winningOption: { type: String, default: null }
});

module.exports = mongoose.model('Market', marketSchema);
