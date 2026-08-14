const express = require('express');
const Store = require('../models/Store');
const router = express.Router();

// Add new store
router.post('/', async (req, res) => {
  try {
    const { name, address } = req.body;
    const store = await Store.create({ name, address });
    res.json({ message: "Store added successfully!", store });
  } catch (err) {
    res.status(500).json({ error: "Error adding store: " + err.message });
  }
});

// Get all stores
router.get('/', async (req, res) => {
  try {
    const stores = await Store.findAll();
    res.json(stores);
  } catch (err) {
    res.status(500).json({ error: "Error fetching stores: " + err.message });
  }
});

module.exports = router;
