const express = require('express');
const { connectToDatabase } = require('./src/config/database');
const dotenv = require('dotenv');
const userRoutes = require('./src/route/user.route'); // Import your user routes

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json()); // Middleware to parse JSON request bodies

// Home route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Use the userRoutes at the /api prefix
app.use('/user', userRoutes); // This makes the user routes available under /user

// Database connection and server start
connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Database connection failed', err);
});
