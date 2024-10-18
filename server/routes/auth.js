import express from 'express';
import bcrypt from 'bcrypt'; // Use bcrypt instead of bcryptjs
import User from '../models/User.js'; // Adjust the path if necessary

const router = express.Router();

// Signup route
router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body; // Include email
  
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
  
        // Check if email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }
  
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
  
        // Create a new user
        const newUser = new User({ username, email, password: hashedPassword }); 
        await newUser.save();
  
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).json({ message: "Signup failed", error: error.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Find the user
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }
  
      // Check the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }
  
      // Successful login
      res.status(200).json({
        message: 'Login successful',
        user: {
          username: user.username,
          email: user.email, // Include email if needed
          // You can include more fields if necessary
        },
      });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error: error.message });
    }
  });

export default router;
