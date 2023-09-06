const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    property_id: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
  },
  {
    timestamps: true,
  }
);

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;
