const jwt = require('jsonwebtoken');
require('dotenv').config(); // To load environment variables

// JWT secret key should be stored in .env file
const JWT_SECRET = process.env.JWT_SECRET;

// JWT configuration options
const JWT_CONFIG = {
  expiresIn: '24h', // Set token expiration time
  algorithm: 'HS256', // Algorithm for signing the token
  issuer: 'your-app-name', // Your app name or domain
  audience: 'your-app-name' // Audience of the token (can be your app name or domain)
};

// Function to generate a JWT token
const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, JWT_CONFIG);
};

module.exports = { generateToken };
