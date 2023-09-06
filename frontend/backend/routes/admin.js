const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/adminController");

// Routes
router.post("/", AdminController.addAdmin);

module.exports = router;
