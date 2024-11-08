const express = require('express');
const { registerUser, loginUser } = require('../controller/user.controller'); // Adjust the path to your controller
const router = express.Router();

// Register user route
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
