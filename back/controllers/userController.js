const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const userController = {
  registerUser: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Check if user with the same username exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: 'Username is already taken.' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({
        username,
        password: hashedPassword,
      });

      await newUser.save();
      res.json({ message: 'User registered successfully.', newUser });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while registering the user.' });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Find the user by username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password.' });
      }

      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid username or password.' });
      }

      //remove old jwt token
      


      // Generate JWT token
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

      res.json({ token: token,user: user, success: true });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while logging in.' });
    }
  },
};

module.exports = userController;
