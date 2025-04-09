const connectDB = require('./db.js');

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const User = require('./schema/User.js');

connectDB();


// Middleware
app.use(express.json());

// In-memory user store (replace with DB in production)
const users = [];

app.get('/',(req,res)=>{
    return res.send("Hello world")
})

// Register Route
app.post('/user/register', async (req, res) => {const { username, email, password } = req.body;

// Simple validation
if (!username || !email || !password) {
  return res.status(400).json({ error: 'All fields are required' });
}

try {
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ error: 'User already exists' });
  }

  // Create and save new user
  const newUser = new User({ username, email, password });
  await newUser.save();

  res.status(201).json({ message: 'User registered', user: newUser });
} catch (err) {
  res.status(500).json({ error: 'Server error', details: err.message });
}});

// Login Route
app.post('/user/login', (req, res) => {
  const { email, password } = req.body;

  // Validate
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Find user
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  res.json({ message: 'Login successful', user });
});


app.get('/notes',(req,res)=>{
  return res.send("notes route working")
});


// Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
