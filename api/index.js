import app from '../backend/server.cjs';

console.log("🚀 Vercel API function starting...");

// Test route to verify function is reached
app.get('/api/test-vercel', (req, res) => res.json({
    message: "Vercel API is alive",
    env: process.env.NODE_ENV,
    time: new Date().toISOString()
}));

export default app;
