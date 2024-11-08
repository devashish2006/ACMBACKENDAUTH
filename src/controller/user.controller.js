const User = require('../model/user.model.js');
const { generateToken } = require('../config/jwt');

// Register controller
const registerUser = async (req, res) => {
  const { email, password, username } = req.body;

  // Check if all fields are provided
  if (!email || !password || !username) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Check if the email contains "amc"
  if (!email.includes('amc')) {
    return res.status(400).json({ error: 'Email must contain the keyword "amc".' });
  }

  try {
    // Check if the email is already taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists.' });
    }

    // Create a new user
    const user = new User({
      username,
      email,
      password, // Save plain text password
    });

    // Save the user to the database
    await user.save();

    // Respond with success
    res.status(201).json({
      message: 'User registered successfully!',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Controller for login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if both email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare the provided password with the stored password
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate a JWT token for the user
    const token = generateToken({
      userId: user._id,
      email: user.email,
      username: user.username
    });

    // Respond with the token and user details
    res.status(200).json({
      message: 'Login successful!',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { registerUser, loginUser };

