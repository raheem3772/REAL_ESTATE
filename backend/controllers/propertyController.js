const Property = require("../models/Property");

const PropertyController = {
  getAllProperties: async (req, res) => {
    try {
      const properties = await Property.find();
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getPropertyById: async (req, res) => {
    try {
      const property = await Property.findById(req.params.id);
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      res.json(property);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  addProperty: async (req, res) => {
    try {
      const { title, location, price, size, bedrooms, buyOrRent, user_id } =
        req.body;
      if (
        !title ||
        !location ||
        !price ||
        !size ||
        !bedrooms ||
        !buyOrRent ||
        !user_id
      ) {
        return res.status(400).json({ message: "Please fill all fields" });
      }
      const newProperty = new Property({
        title,
        location,
        price,
        size,
        bedrooms,
        buyOrRent,
        user_id,
      });

      const savedProperty = await newProperty.save();
      // res.send({ userid: user_id });
      res.status(201).json(savedProperty);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateProperty: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, location, price, size, bedrooms, type } = req.body;

      // Find the property to update
      const property = await Property.findById(id);
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }

      // Update property data
      property.title = title;
      property.location = location;
      property.price = price;
      property.size = size;
      property.bedrooms = bedrooms;
      property.type = type;

      const updatedProperty = await property.save();
      res.json(updatedProperty);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteProperty: async (req, res) => {
    try {
      const { id } = req.params;

      // Find the property to delete
      await Property.findByIdAndDelete(id)
        .then((val) => {
          res.json({ message: "Property deleted" });
        })
        .catch((e) => {
          return res.status(404).json({ message: e.message });
        });
      return res.status(404).json({ message: "Property not found" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = PropertyController;
