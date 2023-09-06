const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    publish_date: { type: Date, default: Date.now },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
