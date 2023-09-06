const express = require("express");
const router = express.Router();
const BlogController = require("../controllers/blogController");

// Routes
router.get("/", BlogController.getAllBlogs);
router.get("/:id", BlogController.getBlogById);
router.post("/", BlogController.addBlog);

module.exports = router;
