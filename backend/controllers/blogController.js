const Blog = require("../models/Blog");

const BlogController = {
  getAllBlogs: async (req, res) => {
    try {
      const blogs = await Blog.find();
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getBlogById: async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.json(blog);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  addBlog: async (req, res) => {
    try {
      const { title, content, author_id } = req.body;
      if (!title || !content) {
        return res.status(400).json({ message: "Please fill all fields" });
      }
      // Create a new blog
      const newBlog = new Blog({
        title,
        content,
        author_id,
        image: req.file.path,
      });

      const savedBlog = await newBlog.save();
      res.status(201).json(savedBlog);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = BlogController;
