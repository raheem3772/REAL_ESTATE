const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    receiver_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    property_id: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
    message_text: { type: String },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
