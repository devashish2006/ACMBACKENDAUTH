const jwt = require('jsonwebtoken');

// Middleware to verify if the user is authenticated
const authenticateUser = (req, res, next) => {
  console.log(req.cookies);  // Log the cookies object to check if the token is present
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Authentication token is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret key
    req.user = decoded; // Attach user info to request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = authenticateUser; // Export the middleware function
