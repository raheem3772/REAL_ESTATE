const express = require("express");
const router = express.Router();
const MessageController = require("../controllers/messageController");

// Routes

router.get("/", MessageController.getMessagesByUser);
router.post("/", MessageController.sendMessage);
router.delete("/:id", MessageController.deleteMessage);

module.exports = router;
