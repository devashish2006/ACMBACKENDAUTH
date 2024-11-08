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





const User = mongoose.model('User', userSchema);

module.exports = User;

