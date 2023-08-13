const Favorite = require("../models/Favorite");

const FavoriteController = {
  getFavoutire: async (req, res) => {
    try {
      const fav = await Favorite.find();
      res.json(fav);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  addFavorite: async (req, res) => {
    try {
      const { user_id, property_id } = req.body;
      // if (!user_id || !property_id) {
      //   return res.status(400).json({ message: "Please fill all fields" });
      // }
      // Check if the property is already in favorites
      const existingFavorite = await Favorite.findOne({
        user_id: user_id,
        property_id: property_id,
      });
      if (existingFavorite) {
        return res
          .status(400)
          .json({ message: "Property already in favorites" });
      }

      // Create a new favorite entry
      const newFavorite = new Favorite({
        user_id: user_id,
        property_id: property_id,
      });

      const savedFavorite = await newFavorite.save();
      res.status(201).json(savedFavorite);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  removeFavorite: async (req, res) => {
    try {
      const { user_id, property_id } = req.params;

      // Find and remove the favorite entry
      const favorite = await Favorite.findOneAndRemove({
        user: user_id,
        property: property_id,
      });
      if (!favorite) {
        return res.status(404).json({ message: "Favorite not found" });
      }

      res.json({ message: "Favorite removed" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = FavoriteController;
