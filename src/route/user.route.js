const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controller/user.controller'); // Adjust the path to your controller
const router = express.Router();

// Register user route
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout',logoutUser)

module.exports = router;
