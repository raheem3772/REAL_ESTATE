const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(
  "mongodb+srv://faizyjutt11:Faiziii5893@cluster0.dbwaiz4.mongodb.net/Real_Estate?retryWrites=true&w=majority"
);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Routes
const userRoutes = require("./routes/user");
const propertyRoutes = require("./routes/property");
const agencyRoutes = require("./routes/agency");
const favoriteRoutes = require("./routes/favorite");
const reviewRoutes = require("./routes/review");
const messageRoutes = require("./routes/message");
const blogRoutes = require("./routes/blog");
const adminRoutes = require("./routes/admin");

app.use("/users", userRoutes);
app.use("/properties", propertyRoutes);
app.use("/agencies", agencyRoutes);
app.use("/favorites", favoriteRoutes);
app.use("/reviews", reviewRoutes);
app.use("/messages", messageRoutes);
app.use("/blogs", blogRoutes);
app.use("/admins", adminRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
