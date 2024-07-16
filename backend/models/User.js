// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  walletAddress: { type: String, required: true },
  bets: [{
    market: { type: String, required: true },
    amount: { type: Number, required: true },
    option: { type: String, required: true },
  }],
  ETH: { type: Number, required: false },
});

module.exports = mongoose.model('User', userSchema);

