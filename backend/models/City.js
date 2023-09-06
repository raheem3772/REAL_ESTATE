const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  name: { type: String, required: true },
  // Add more fields as needed
});

const City = mongoose.model("City", citySchema);

module.exports = City;
