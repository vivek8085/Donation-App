// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  referralCode: String,
  donations: { type: Number, default: 0 },
});

const User = mongoose.model('User', userSchema);

// Leaderboard API
app.get('/api/leaderboard', async (req, res) => {
  const users = await User.find().sort({ donations: -1 }).limit(10);
  res.json(users);
});

// Signup API
app.post('/api/signup', async (req, res) => {
  const { name, email, password, donations, totalDonations } = req.body;
  try {
    const referralCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    let donationValue = (typeof donations !== 'undefined') ? Number(donations) : Number(totalDonations);
    console.log('Received donations:', donations, 'totalDonations:', totalDonations, 'Final value:', donationValue);
    if (isNaN(donationValue) || donationValue < 0) donationValue = 0;
    const user = new User({ name, email, password, referralCode, donations: donationValue });
    await user.save();
    res.status(201).json({ message: 'Signup successful', user });
  } catch (err) {
    res.status(400).json({ error: 'Email already exists' });
  }
});

// Login API

// Login API: If user exists, update donations if provided, else error
app.post('/api/login', async (req, res) => {
  const { email, password, totalDonations } = req.body;
  let user = await User.findOne({ email, password });
  if (user) {
    // If a new donation value is provided, update it
    if (typeof totalDonations !== 'undefined' && totalDonations !== null && totalDonations !== "") {
      user.donations = Number(totalDonations);
    }
    await user.save();
    res.json({ message: 'Login successful', user });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Get user info
app.get('/api/user/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
