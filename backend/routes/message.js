const express = require("express");
const router = express.Router();
const MessageController = require("../controllers/messageController");

// Routes

router.get("/:userId", MessageController.getMessagesByUser);
router.get("/property/:propertyId", MessageController.getMessagesByPropertyId); // New route
router.post("/", MessageController.sendMessage);
router.delete("/:id", MessageController.deleteMessage);

module.exports = router;
