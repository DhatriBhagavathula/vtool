const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRouter = require("./routes/auth");

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json()); // For parsing application/json
app.use(cors()); // Enable CORS

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI) // No need for useNewUrlParser or useUnifiedTopology
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// Routes
app.use("/api/auth", authRouter);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
