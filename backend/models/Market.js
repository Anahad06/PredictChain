const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const marketSchema = new Schema({
  Description: { type: String, required: true },
  numOptions: { type: Number, required: true },
  Options: [{ type: String }], 
});  

module.exports = mongoose.model('Market', marketSchema);
