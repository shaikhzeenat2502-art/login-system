const express = require('express');
const Rating = require('../models/Rating');
const User = require('../models/User');
const Store = require('../models/Store');

const router = express.Router();   // 👈 yahan router define karo

// Submit rating
router.post('/', async (req, res) => {
  try {
    const { userId, storeId, rating } = req.body;
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }
    const newRating = await Rating.create({
      rating,
      user_id: userId,   // 👈 snake_case
      store_id: storeId  // 👈 snake_case
    });
    res.json({ message: "Rating submitted successfully!", rating: newRating });
  } catch (err) {
    res.status(500).json({ error: "Error submitting rating: " + err.message });
  }
});

// Get ratings for a store
router.get('/store/:storeId', async (req, res) => {
  try {
    const ratings = await Rating.findAll({
      where: { store_id: req.params.storeId },
      include: [User]
    });
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ error: "Error fetching ratings: " + err.message });
  }
});

module.exports = router;
