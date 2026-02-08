const app = require('../backend/server');

// Test route to verify function is reached
app.get('/api', (req, res) => res.json({ message: "API is alive", env: process.env.NODE_ENV }));

module.exports = app;

