// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const router = express.Router();

const validateRegistration = [
    check('username').length({min: 3}).withMessage('Username must be at least 3 characters long.'),
    check('email').isEmail().withMessage('Please provide a valid email address.'),
    check('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long.'),
];

// POST /auth/register

router.post('/register', validateRegistration,  async (req, res) => {
    // Check for validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}
);

// POST /auth/login

router.post('/login', async (req, res) => {

    try {

        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }


        // Here, you would generate and send a JWT token to the client.

        res.json({ message: 'User logged in successfully.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });

    }
}
);

module.exports = router;

