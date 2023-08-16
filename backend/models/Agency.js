const mongoose = require("mongoose");

const agencySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, default: 0 },
    description: { type: String },
    verified: { type: Boolean, default: false },
    contactInfo: { type: String },
    properties: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }],
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isApproved: { type: Boolean, default: false }, // New field for approval status
  },
  {
    timestamps: true,
  }
);

const Agency = mongoose.model("Agency", agencySchema);

module.exports = Agency;
