const express = require("express");
const router = express.Router();
const ReviewController = require("../controllers/reviewController");

// Routes
router.post("/", ReviewController.addReview);

module.exports = router;
