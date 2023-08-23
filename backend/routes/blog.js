const express = require("express");
const router = express.Router();
const BlogController = require("../controllers/blogController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
// Routes
router.get("/", BlogController.getAllBlogs);
router.get("/:id", BlogController.getBlogById);
router.post("/", upload.single("image"), BlogController.addBlog);

module.exports = router;
