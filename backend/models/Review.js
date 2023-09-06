const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    agency_id: { type: mongoose.Schema.Types.ObjectId, ref: "AgencyMain" },
    rating: { type: Number },
    review_text: { type: String },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
