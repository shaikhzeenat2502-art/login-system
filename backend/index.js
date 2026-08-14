const express = require("express");
const cors = require("cors");
const sequelize = require("./db");       // DB connection import
const User = require("./models/User");   // User model import
const Store = require("./models/Store"); // Store model import
const Rating = require("./models/Rating"); // Rating model import

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

// ======================= REGISTER ROUTE =======================
app.post("/auth/register", async (req, res) => {
  try {
    const { name, email, address, password, role } = req.body;
    const newUser = await User.create({ name, email, address, password, role });
    res.json({ message: "User registered successfully!", user: newUser });
  } catch (err) {
    console.error("Registration error:", err.sqlMessage || err.message);
    res.status(500).json({ message: "Error during registration", error: err });
  }
});

// ======================= LOGIN ROUTE =======================
app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email, password } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.json({ message: "Login successful!", user });
  } catch (err) {
    console.error("Login error:", err.sqlMessage || err.message);
    res.status(500).json({ message: "Error during login", error: err });
  }
});

// ======================= USERS LIST =======================
app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err });
  }
});

// ======================= ADD USER =======================
app.post("/users", async (req, res) => {
  try {
    const { name, email, address, role } = req.body;
    const newUser = await User.create({ name, email, address, role });
    res.json({ message: "User added successfully!", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Error adding user", error: err });
  }
});

// ======================= STORES LIST =======================
app.get("/stores", async (req, res) => {
  try {
    const stores = await Store.findAll();
    res.json(stores);
  } catch (err) {
    res.status(500).json({ message: "Error fetching stores", error: err });
  }
});

// ======================= ADD STORE =======================
app.post("/stores", async (req, res) => {
  try {
    const { name, email, address, rating } = req.body;
    const newStore = await Store.create({ name, email, address, rating });
    res.json({ message: "Store added successfully!", store: newStore });
  } catch (err) {
    res.status(500).json({ message: "Error adding store", error: err });
  }
});

// ======================= COUNTS =======================
app.get("/counts", async (req, res) => {
  try {
    const usersCount = await User.count();
    const storesCount = await Store.count();
    const ratingsCount = await Rating.count();
    res.json({ users: usersCount, stores: storesCount, ratings: ratingsCount });
  } catch (err) {
    res.status(500).json({ message: "Error fetching counts", error: err });
  }
});

// ======================= SYNC DB =======================
sequelize.sync()
  .then(() => {
    console.log("Database synced successfully!");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("Database sync error:", err);
  });
