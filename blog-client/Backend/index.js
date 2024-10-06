const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config(); 
const userRoutes = require('./routes/index');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

const app = express();
const Port = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL, // Ensure the correct frontend URL is in your .env file
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests
app.options('*', cors());

// Connect to MongoDB
connectDB();

// Middleware for routes
app.use('/api', userRoutes);

// Start the server
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
