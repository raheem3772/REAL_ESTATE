const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

// Routes
router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.post("/signup", UserController.signupUser);
router.put("/signup/:id", UserController.updateUser);
router.delete("/signup/:id", UserController.deleteUser);
router.post("/login", UserController.loginUser);

module.exports = router;
