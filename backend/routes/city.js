const express = require("express");
const City = require("../models/City");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Fill all fields" });
    }
    const newCity = new City({ name });
    const savedCity = await newCity.save();
    res.status(201).json(savedCity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
