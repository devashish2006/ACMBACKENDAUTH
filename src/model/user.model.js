const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

// Pre-save middleware to hash the password before saving it
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash if password is modified
  this.password = await bcrypt.hash(this.password, 10); // Hash the password with 10 rounds
  next();
});

// Method to compare password for login
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password); // Compare password with the hash
};

const User = mongoose.model('User', userSchema);

module.exports = User;
