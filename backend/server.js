const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./Models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Product = require('./Models/Product');
const cookieParser = require('cookie-parser');
// path already required at top
const verify = require('./middleware/verifyuser');



const allowedOrigins = [
  'http://localhost:5173',
  'https://frontend-agyt.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman or server-to-server)
    if (!origin) return callback(null, true);

    // allow if origin is in allowedOrigins
    if (allowedOrigins.some(o => origin.startsWith(o))) {
      return callback(null, true);
    }

    // otherwise block
    return callback(new Error(`CORS error: Origin ${origin} not allowed`));
  },
  credentials: true
}));


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

const buildPath = path.resolve(__dirname, 'frontend-build');
app.use(express.static(buildPath));

// --- AUTHENTICATION ROUTES ---

// SIGNUP
app.post('/api/signup', async (req, res) => {
  try {
    const { name, username, email, password, phone } = req.body;

    // 1. Validation
    if (!name || !username || !email || !password || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Check existing user
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email or username already exists" });
    }

    // 3. Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create User
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      phone
    });

    res.status(201).json({ message: "Signup successful", user });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
});

// LOGIN
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // 1. Find User
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // 2. Compare Password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

    // 3. Generate Token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'secretkey', {
      expiresIn: '1d'
    });

    // 4. Set Cookie (Optional redundancy)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000
    });

    // 5. Return Token (Critical for frontend localStorage)
    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

// LOGOUT
app.post('/api/logout', (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none'
  });
  res.status(200).json({ message: "Logout successful" });
});

// CHECK AUTH (Me)
app.get('/api/me', verify, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    // Note: verify middleware sets req.user. We assume payload has 'id'.
    // In previous code check, payload was { email }. I updated sign to include { id }.
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get('/api/products', async (req, res) => {
  const category = req.query.category;
  try {
    const products = await Product.find(category ? { category } : {});
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.get('/api/products/search', async (req, res) => {
  const query = req.query.q;
  try {
    const results = await Product.find({
      productName: { $regex: query, $options: 'i' }
    });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Failed to search products" });
  }
});

app.get('/api/test/categories', async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Error fetching categories", details: err.message });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
