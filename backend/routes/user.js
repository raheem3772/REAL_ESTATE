const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// Routes
router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.post("/signup", upload.single("image"), UserController.signupUser);
router.put("/signup/:id", UserController.updateUser);
router.delete("/signup/:id", UserController.deleteUser);
router.post("/login", UserController.loginUser);

module.exports = router;
