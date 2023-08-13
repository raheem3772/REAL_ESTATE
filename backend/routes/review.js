const express = require("express");
const router = express.Router();
const ReviewController = require("../controllers/reviewController");

// Routes
router.get("/", ReviewController.getReview);
router.post("/", ReviewController.addReview);

module.exports = router;
