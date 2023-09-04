const AgencyMain = require("../models/AgencyMain");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const agencyControllerMain = {
  getAllAgencies: async (req, res) => {
    try {
      const agencyMain = await AgencyMain.find();
      res.json(agencyMain);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getAgenciesNA: async (req, res) => {
    try {
      const agencyMain = await AgencyMain.find({ verified: false }); // Retrieve only approved agencyMain
      res.json(agencyMain);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getAgencyById: async (req, res) => {
    try {
      const agencyMain = await AgencyMain.findById(req.params.id);
      if (!agencyMain) {
        return res.status(404).json({ message: "Agency not found" });
      }
      res.json(agencyMain);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  signupAgency: async (req, res) => {
    // console.log(req.files.image[0].path);
    console.log(req.files);
    try {
      const {
        username,
        email,
        password,
        confirmpassword,
        contactInfo,
        description,
      } = req.body;
      if (!email || !password || !username || !contactInfo || !description) {
        return res.status(400).json({ message: "Please fill all fields" });
      }
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }
      // Check if the email is already in use
      const existingAgency = await AgencyMain.findOne({ email });
      if (existingAgency) {
        return res.status(400).json({ message: "Email already registered" });
      }
      if (password !== confirmpassword) {
        return res.status(400).json({ message: "Password does not match" });
      }
      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters" });
      }
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      const image = req.files.image[0].path; // Get the image file path
      const docs = req.files.docs[0].path; // Get the PDF file path

      const newAgency = new AgencyMain({
        username,
        email,
        password: hashedPassword,
        contactInfo,
        description,
        image,
        docs,
      });

      const savedAgency = await newAgency.save();
      res.status(201).json(savedAgency);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  loginAgency: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find user by email
      const agencyMain = await AgencyMain.findOne({ email });
      if (!agencyMain) {
        return res.status(401).json({ message: "Invalid Credentials" });
      }

      // Compare passwords
      const isPasswordValid = await bcrypt.compare(
        password,
        agencyMain.password
      );
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid Credentials" });
      }

      if (agencyMain.verified === false) {
        return res
          .status(400)
          .json({ message: "Waiting for the approval by admin" });
      }

      const payload = {
        agencyMain: {
          id: agencyMain._id,
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
          res.json({
            message: "Login successful",
            token,
            agency_id: agencyMain._id,
          });
        }
      );
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateAgency: async (req, res) => {
    try {
      const { id } = req.params;
      const { username, email, password, description, contactInfo } = req.body;

      // Find the user to update
      const agencyMain = await AgencyMain.findById(id);
      if (!agencyMain) {
        return res.status(404).json({ message: "Agency not found" });
      }
      const image = req.file.path;

      // Update user data
      agencyMain.username = username;
      agencyMain.email = email;
      agencyMain.password = password;
      agencyMain.description = description;
      agencyMain.contactInfo = contactInfo;
      agencyMain.image = image;

      if (password) {
        // Hash the updated password
        agencyMain.password = await bcrypt.hash(password, 10);
      }

      const updatedAgency = await agencyMain.save();
      res.json(updatedAgency);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deleteAgency: async (req, res) => {
    try {
      const { id } = req.params;

      // Find the user to delete
      await AgencyMain.findByIdAndDelete(id)
        .then((val) => {
          res.json({ message: "Agency deleted" });
        })
        .catch((e) => {
          return res.status(404).json({ message: "Agency not found" });
        });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  approveAgencyR: async (req, res) => {
    try {
      const { id } = req.params;

      // Find the agency to update
      const agencyMain = await AgencyMain.findById(id);
      if (!agencyMain) {
        return res.status(404).json({ message: "Agency not found" });
      }

      // Update agency data
      agencyMain.verified = true;
      const updatedAgency = await agencyMain.save();
      res.json(updatedAgency);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteAgencyR: async (req, res) => {
    try {
      const { id } = req.params;

      // Find the agency to delete
      await AgencyMain.findByIdAndDelete(id)
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

module.exports = agencyControllerMain;
