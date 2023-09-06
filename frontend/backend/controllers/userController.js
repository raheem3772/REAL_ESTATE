const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  signupUser: async (req, res) => {
    try {
      const { username, email, password, confirmpassword } = req.body;
      if (!email || !password || !username) {
        return res.status(400).json({ message: "Please fill all fields" });
      }
      // Check if the email is already in use
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }
      if (password !== confirmpassword) {
        return res.status(400).json({ message: "Password does not match" });
      }
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        is_registered: true,
      });

      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
      console.log("Success");
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log("server error");
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid Credentials" });
      }

      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid Credentials" });
      }
      const payload = {
        user: {
          id: user._id,
          // You can add more data here if needed
        },
      };

      jwt.sign(
        payload,
        "your-secret-key",
        { expiresIn: "1h" }, // You can adjust the expiration time as needed
        (error, token) => {
          if (error) {
            throw error;
          }
          res.json({ message: "Login successful", token, user_Id: user._id });
        }
      );
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { username, email, password } = req.body;

      // Find the user to update
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Update user data
      user.username = username;
      user.email = email;
      if (password) {
        // Hash the updated password
        user.password = await bcrypt.hash(password, 10);
      }

      const updatedUser = await user.save();
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;

      // Find the user to delete
      await User.findByIdAndDelete(id)
        .then((val) => {
          res.json({ message: "User deleted" });
        })
        .catch((e) => {
          return res.status(404).json({ message: "User not found" });
        });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = UserController;
