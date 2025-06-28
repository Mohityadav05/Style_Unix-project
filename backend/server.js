const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./Models/User');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Product = require('./Models/Product');
const verify  = require('./middleware/verifyuser');


const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect('mongodb://127.0.0.1:27017/live_project', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));


app.post('/api/signup', (req, res) => {
  bcrypt.genSalt(10, (error, salt) => {
    bcrypt.hash(req.body.password, salt, async (error, hash) => {
      try {
        let createuser = await User.create({
          name: req.body.name,
          username: req.body.username,
          email: req.body.email,
          password: hash,
          phone: req.body.phone
        });
        return res.status(200).json({ message: "Signup successful", user: createuser });
      } catch (err) {
        res.status(500).json({ message: "Signup failed" });
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

    const token = jwt.sign({ email: user.email }, 'secretkey');
    res.cookie("token", token)
      .status(200)
      .json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

app.get('/api/products', async (req, res) => {
  const category = req.query.category;
  try {
    const products = await Product.find(category ? { category } : {});
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.get('/api/products/search',verify, async (req, res) => {
  const query = req.query.q;
  const results = await Product.find({
    productName: { $regex: query, $options: 'i' }
  });
  res.json(results);
});

app.post('/api/logout', (req, res) => {
  res.clearCookie("token", "");
  res.status(200).json({ message: 'Logout successful' });
});


app.use(express.static(path.join(__dirname, "../frontend/vite-project/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/vite-project/dist/index.html"));
});


app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
