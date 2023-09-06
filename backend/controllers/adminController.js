const Admin = require("../models/Admin");
const User = require("../models/User");

// ... other imports and code ...
const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get admin by ID
const getAdminById = async (req, res) => {
  try {
    const { adminId } = req.params;
    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const makeUserAdmin = async (req, res) => {
  try {
    const { userId } = req.params; // Assuming userId is provided in the URL

    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create an admin instance and associate it with the user
    const admin = new Admin({ user_id: user._id });

    // Save the admin instance
    await admin.save();

    // Update the user's isAdmin field
    user.isAdmin = true;
    await user.save();

    res.json({ message: "User promoted to admin" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { makeUserAdmin, getAdminById, getAllAdmins };
