require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/warehouse';

console.log('Attempting to connect to MongoDB...');
console.log('Database:', MONGODB_URI.includes('localhost') ? 'Local MongoDB' : 'MongoDB Atlas');

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
})
  .then(() => {
    console.log('✓ Successfully connected to MongoDB');
    console.log('Database: warehouse');
    console.log('Mongoose connection state:', mongoose.connection.readyState === 1 ? 'Connected' : 'Not Connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    console.error('Failed to connect to database:', err);
    process.exit(1);
  });

// Connection event handlers
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.warn('Mongoose disconnected from MongoDB');
});

mongoose.connection.on('reconnected', () => {
  console.log('✓ Mongoose reconnected to MongoDB');
});

// Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Warehouse Package System API is running',
    timestamp: new Date().toISOString(),
  });
});

// Import package routes
const packageRoutes = require('./src/routes/packages');
app.use('/api/packages', packageRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API Health Check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
