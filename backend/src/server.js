const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const analyticsRoutes = require('./routes/analyticsRoutes');

// Health check route
app.get('/health', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Use analytics routes
app.use('/api/analytics', analyticsRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});