const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./Models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Product = require('./Models/Product');
const cookieParser = require('cookie-parser');
const path = require('path');
const verify = require('./middleware/verifyuser');

require('dotenv').config(); 


const allowedOrigins = [
  'http://localhost:5173',                 // local dev
  'https://frontend-agyt.onrender.com'     // deployed frontend
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,  
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

const buildPath = path.resolve(__dirname, '../frontend/vite-project/dist');
app.use(express.static(buildPath));

app.post('/api/signup', (req, res) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, async (err, hash) => {
      try {
        const user = await User.create({
          name: req.body.name,
          username: req.body.username,
          email: req.body.email,
          password: hash,
          phone: req.body.phone
        });
        res.status(200).json({ message: "Signup successful", user });
      } catch (err) {
        res.status(500).json({ message: "Signup failed", error: err.message });
      }
    });
  });
});

app.post('/api/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET || 'secretkey', {
      expiresIn: '1d'
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'none',  
      maxAge: 24 * 60 * 60 * 1000 
    });

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

app.post('/api/logout', (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none'
  });
  res.status(200).json({ message: "Logout successful" });
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
