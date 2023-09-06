const Review = require("../models/Review");

const ReviewController = {
  addReview: async (req, res) => {
    try {
      const { user_id, agency_id, rating, review_text } = req.body;

      // Create a new review
      const newReview = new Review({
        user_id: user_id,
        agency_id: agency_id,
        rating,
        review_text,
      });

      const savedReview = await newReview.save();
      res.status(201).json(savedReview);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getReview: async (req, res) => {
    try {
      const reviews = await Review.find();
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = ReviewController;
