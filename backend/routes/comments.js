const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/commentsController");

// Routes
router.get("/", CommentController.getAllComments);
router.post("/", CommentController.addComments);

module.exports = router;
