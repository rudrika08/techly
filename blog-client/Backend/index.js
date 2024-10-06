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

// // Define allowed origins (Vercel frontend + localhost for development)
// const allowedOrigins = ['https://blog-by-you-frontend.vercel.app', 'http://localhost:5173'];

// app.use(cors({
//   origin: '*',
//   credentials: true, 
// }));

// Allow multiple variations of the domain
const allowedOrigins = [
  'https://blog-by-you-frontend.vercel.app',
  'http://blog-by-you-frontend.vercel.app',    // in case HTTP is used
  'https://www.blog-by-you-frontend.vercel.app', // in case www is used
  'http://www.blog-by-you-frontend.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Handle preflight requests
// app.options('*', cors());

// Connect to MongoDB
connectDB();

// Middleware for routes
app.use('/api', userRoutes);

// Start the server
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
