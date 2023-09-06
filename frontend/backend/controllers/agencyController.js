const Agency = require("../models/Agency");

const AgencyController = {
  getAllAgencies: async (req, res) => {
    try {
      const agencies = await Agency.find();
      res.json(agencies);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAgencyById: async (req, res) => {
    try {
      const agency = await Agency.findById(req.params.id);
      if (!agency) {
        return res.status(404).json({ message: "Agency not found" });
      }
      res.json(agency);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  addAgency: async (req, res) => {
    try {
      const { name, rating, description } = req.body;

      if (!name) {
        return res.status(400).json({ message: "Please fill all fields" });
      }
      const newAgency = new Agency({
        name,
        rating,
        description,
      });

      const savedAgency = await newAgency.save();
      res.status(201).json(savedAgency);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateAgency: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, rating, description } = req.body;

      // Find the agency to update
      const agency = await Agency.findById(id);
      if (!agency) {
        return res.status(404).json({ message: "Agency not found" });
      }

      // Update agency data
      agency.name = name;
      agency.rating = rating;
      agency.description = description;

      const updatedAgency = await agency.save();
      res.json(updatedAgency);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteAgency: async (req, res) => {
    try {
      const { id } = req.params;

      // Find the agency to delete
      await Agency.findByIdAndDelete(id)
        .then((val) => {
          res.json({ message: "Agency deleted" });
        })
        .catch((e) => {
          return res.status(404).json({ message: e.message });
        });
      // return res.status(404).json({ message: "Agency not found" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = AgencyController;
