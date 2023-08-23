const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = 4000;
// Middleware
// Adjust the limit as needed
// app.use(express.urlencoded({ limit: "50mb" })); // MongoDB Connection
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

mongoose.connect(
  "mongodb+srv://faizyjutt11:Faiziii5893@cluster0.dbwaiz4.mongodb.net/Real_Estate?retryWrites=true&w=majority"
);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Routes
const userRoutes = require("./routes/user");
const agencyMain = require("./routes/agencyMain");
const propertyRoutes = require("./routes/property");
const agencyRoutes = require("./routes/agency");
const favoriteRoutes = require("./routes/favorite");
const reviewRoutes = require("./routes/review");
const messageRoutes = require("./routes/message");
const blogRoutes = require("./routes/blog");
const commentRoutes = require("./routes/comments");
const cityRoutes = require("./routes/city");
const adminRoutes = require("./routes/admin");

app.use("/users", userRoutes);
app.use("/agencymain", agencyMain);
app.use("/properties", propertyRoutes);
app.use("/agencies", agencyRoutes);
app.use("/favorites", favoriteRoutes);
app.use("/reviews", reviewRoutes);
app.use("/messages", messageRoutes);
app.use("/blogs", blogRoutes);
app.use("/comments", commentRoutes);
app.use("/cities", cityRoutes);
app.use("/admins", adminRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
