const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");

const AdminController = {
  addAdmin: async (req, res) => {
    try {
      const { email, password, username } = req.body;
      if (!email || !password || !username) {
        return res.status(400).json({ message: "Please fill all fields" });
      }
      // Check if the email is already in use
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return res
          .status(400)
          .json({ message: "Email already registered as admin" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new admin
      const newAdmin = new Admin({
        username,
        email,
        password: hashedPassword,
      });

      const savedAdmin = await newAdmin.save();
      res.status(201).json(savedAdmin);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = AdminController;
