const Message = require("../models/Message");

const MessageController = {
  sendMessage: async (req, res) => {
    try {
      const { sender_id, receiver_id, message_text } = req.body;

      // Create a new message
      const newMessage = new Message({
        sender_id: sender_id,
        receiver_id: receiver_id,
        message_text: message_text,
      });

      const savedMessage = await newMessage.save();
      res.status(201).json(savedMessage);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getMessagesByUser: async (req, res) => {
    try {
      const { userId } = req.params;

      // Find messages sent or received by the user
      const messages = await Message.find({
        $or: [{ sender: userId }, { receiver: userId }],
      });

      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deleteMessage: async (req, res) => {
    try {
      const { id } = req.params;

      // Find and remove the message
      const message = await Message.findByIdAndRemove(id);
      if (!message) {
        return res.status(404).json({ message: "Message not found" });
      }

      res.json({ message: "Message deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = MessageController;
