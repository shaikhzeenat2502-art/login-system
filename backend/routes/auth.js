const express = require('express');
const User = require('../models/User');
const router = express.Router();

// ✅ Signup Route
router.post('/signup', async (req, res) => {
  try {
    const { name, email, address, password, role } = req.body;

    // password ko as-is save karna (plain text)
    const user = await User.create({ name, email, address, password, role });

    res.json({ message: "User signed up successfully!", user });
  } catch (err) {
    res.status(500).json({ error: "Error signing up user: " + err.message });
  }
});

// ✅ Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // pehle email check karo
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // fir password compare karo
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ error: "Error logging in: " + err.message });
  }
});

module.exports = router;
