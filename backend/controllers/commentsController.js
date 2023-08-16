const Comment = require("../models/Comments");

const CommentController = {
  getAllComments: async (req, res) => {
    try {
      const comments = await Comment.find();
      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  addComments: async (req, res) => {
    try {
      const { content, author_id, blog_id } = req.body;
      if (!content || !author_id || !blog_id) {
        return res.status(400).json({ message: "Please fill all fields" });
      }
      const newComment = new Comment({
        content,
        author_id,
        blog_id,
      });

      const savedComment = await newComment.save();
      // res.send({ userid: user_id });
      res.status(201).json(savedComment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = CommentController;
