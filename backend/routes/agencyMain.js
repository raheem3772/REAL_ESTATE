const express = require("express");
const router = express.Router();
const agencyControllerMain = require("../controllers/agencyControllerMain");
// const upload = multer({
//   dest: "uploads/",
//   //   fileFilter: (req, file, cb) => {
//   //     if (
//   //       file.mimetype.startsWith("image/") || // Allow images
//   //       file.mimetype === "application/pdf" // Allow PDF files
//   //     ) {
//   //       cb(null, true);
//   //     } else {
//   //       cb(new Error("Invalid file type"));
//   //     }
//   //   },
// });
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
// Routes
router.get("/", agencyControllerMain.getAllAgencies);
router.get("/na", agencyControllerMain.getAgenciesNA);
router.get("/:id", agencyControllerMain.getAgencyById);
router.post(
  "/signup",
  upload.single("image"),
  agencyControllerMain.signupAgency
);
router.put(
  "/signup/:id",
  upload.single("image"),
  agencyControllerMain.updateAgency
);
router.put("/approve/:id", agencyControllerMain.approveAgencyR);
router.delete("/remove/:id", agencyControllerMain.deleteAgencyR);
router.delete("/signup/:id", agencyControllerMain.deleteAgency);
router.post("/login", agencyControllerMain.loginAgency);

module.exports = router;
