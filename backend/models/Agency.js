const mongoose = require("mongoose");

const agencySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, default: 0 },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

const Agency = mongoose.model("Agency", agencySchema);

module.exports = Agency;
