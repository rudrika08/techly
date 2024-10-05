const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config(); 
const userRoutes = require('./routes/index');
const connectDB = require('./config/db');
const Port=process.env.PORT || 8000;
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());

app.use(cors({
  origin: ["https://blog-by-you-frontend.vercel.app/"], 
  credentials: true 
}));

app.use(cookieParser());

// Connect to MongoDB
connectDB();

//middleWware
app.use('/api',userRoutes);

// Start the server
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
