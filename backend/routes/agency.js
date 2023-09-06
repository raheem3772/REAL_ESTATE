const express = require("express");
const router = express.Router();
const AgencyController = require("../controllers/agencyController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
// Routes
router.get("/", AgencyController.getAllAgencies);
router.get("/na/", AgencyController.getAgenciesNA);
router.get("/:id", AgencyController.getAgencyById);
router.get("/:id", AgencyController.getAgencyById);
router.post("/", upload.single("image"), AgencyController.addAgency);
router.put("/:id", AgencyController.updateAgency);
router.put("/approveagency/:id", AgencyController.approveAgency);
router.delete("/:id", AgencyController.deleteAgency);

module.exports = router;
