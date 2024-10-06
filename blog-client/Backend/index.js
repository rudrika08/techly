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

// Allowed origins for development (localhost) and production (Vercel frontend)
const allowedOrigins = [
  'https://blog-by-you-frontend.vercel.app', // Production frontend
  'http://localhost:5173', // Local development frontend
  'https://www.blog-by-you-frontend.vercel.app', // In case of 'www' usage
  'http://www.blog-by-you-frontend.vercel.app'  // HTTP version with 'www'
];

// CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      // Allow the request if the origin is in the list or is undefined (for non-browser requests like Postman)
      callback(null, true);
    } else {
      // Block the request with a proper error message
      callback(new Error('CORS policy: This origin is not allowed by CORS.'));
    }
  },
  credentials: true,  // Allow cookies, authentication, etc.
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers in the requests
}));

// Handle preflight (OPTIONS) requests globally
app.options('*', cors());

// Connect to MongoDB
connectDB();

// Middleware for routes
app.use('/api', userRoutes);

// Start the server
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
