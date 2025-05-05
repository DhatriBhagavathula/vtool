const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { email, phone, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ detail: "User already exists" });

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, phone, password: hashedPassword });

    // Save the new user
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error("❌ Error during registration:", err);
    res.status(500).json({ detail: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { emailOrPhone, password } = req.body;
  console.log("📥 Login request:", req.body); // Debug log

  try {
    // Find the user by email or phone
    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    });

    if (!user) {
      console.log("❌ User not found");
      return res.status(404).json({ detail: "User not found" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Invalid password");
      return res.status(400).json({ detail: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("✅ Login successful");
    res.json({ token });
  } catch (err) {
    console.error("❌ Server error during login:", err); // Log the error
    res.status(500).json({ detail: "Server error" });
  }
});

// Protected route for profile (requires JWT token)
router.get("/profile", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token
  if (!token) return res.status(401).json({ detail: "Unauthorized" });

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password"); // Exclude password field
    res.json(user);
  } catch (err) {
    console.error("❌ Invalid token:", err);
    res.status(401).json({ detail: "Invalid token" });
  }
});

module.exports = router;
