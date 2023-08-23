const express = require("express");
const router = express.Router();
const PropertyController = require("../controllers/propertyController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// Routes for property
router.get("/", PropertyController.getAllProperties);
router.get("/:id", PropertyController.getPropertyById);
router.get("/city/:cityId", PropertyController.getPropertyByCity);
router.get("/rent/", PropertyController.getPropertyrent);
router.get("/buy/", PropertyController.getPropertybuy);

// Apply upload.single middleware for the / route to handle file upload
// router.post("/", upload.single("file"), PropertyController.addProperty);
router.post("/", upload.array("image", 8), PropertyController.addProperty);

router.put("/:id", upload.array("image", 8), PropertyController.updateProperty);
router.put("/feature/:id", PropertyController.makePropertyFeature);
router.delete("/:id", PropertyController.deleteProperty);

module.exports = router;
