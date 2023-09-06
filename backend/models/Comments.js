const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    author_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    blog_id: { type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
