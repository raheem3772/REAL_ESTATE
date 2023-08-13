const express = require("express");
const router = express.Router();
const FavoriteController = require("../controllers/favoriteController");

// Routes
router.get("/", FavoriteController.getFavoutire);
router.post("/", FavoriteController.addFavorite);
router.delete("/:id", FavoriteController.removeFavorite);

module.exports = router;
