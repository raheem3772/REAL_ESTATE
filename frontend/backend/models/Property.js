const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    buyOrRent: {
      type: String,
      enum: ["buy", "rent"],
      required: true,
    },
    agency_id: { type: mongoose.Schema.Types.ObjectId, ref: "Agency" },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    is_featured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
