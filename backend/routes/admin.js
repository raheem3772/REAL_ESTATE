const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/adminController");

// Routes
router.post("/make-admin/:userId", AdminController.makeUserAdmin);
router.get("/", AdminController.getAllAdmins);
router.get("/:adminId", AdminController.getAdminById);

module.exports = router;
