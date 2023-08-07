const express = require("express");
const router = express.Router();
const AgencyController = require("../controllers/agencyController");

// Routes
router.get("/", AgencyController.getAllAgencies);
router.get("/:id", AgencyController.getAgencyById);
router.post("/", AgencyController.addAgency);
router.put("/:id", AgencyController.updateAgency);
router.delete("/:id", AgencyController.deleteAgency);

module.exports = router;
