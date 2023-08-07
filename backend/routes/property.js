const express = require("express");
const router = express.Router();
const PropertyController = require("../controllers/propertyController");

// Routes
router.get("/", PropertyController.getAllProperties);
router.get("/:id", PropertyController.getPropertyById);
router.post("/", PropertyController.addProperty);
router.put("/:id", PropertyController.updateProperty);
router.delete("/:id", PropertyController.deleteProperty);

module.exports = router;
