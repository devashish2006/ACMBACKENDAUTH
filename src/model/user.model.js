const mongoose = require('mongoose');

// User Schema for Registration and Login
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6 // Enforcing minimum length for password
  }
});

// Pre-save middleware to hash the password before saving it (removed)

// Method to compare password for login (removed)

const User = mongoose.model('User', userSchema);

module.exports = User;

