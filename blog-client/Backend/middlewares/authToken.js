const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
  try {
    // Extract token from cookies or authorization header
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        message: "No token provided",
        data: [],
        error: true,
        success: false,
      });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: err.name === "TokenExpiredError" ? "Token has expired" : "Invalid token log in",
          data: [],
          error: true,
          success: false,
        });
      }

      req.user = decoded.data; 
      console.log('Decoded User:', req.user);
      next(); 
    });
  } catch (err) {
    return res.status(500).json({
      message: "An error occurred during authentication",
      data: [],
      error: true,
      success: false,
    });
  }
}

module.exports = authToken;
