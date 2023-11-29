// routes/passwordReset.js

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const nodemailer = require('nodemailer');

const JWT_SECRET = process.env.JWT_SECRET ||'your-secret-key'; // Replace 'your-secret-key' with your actual secret key
// Mock user data (replace with database logic in real app)
const users = [
    { id: 1, email: 'user@example.com', password: 'hashedpassword' },
    //Add more users here
];


// Secret key for JWT (replace with your own)

router.post('/request', async (req, res) => {
    const { email } = req.body;

    // Check if user exists in database
    const user = users.find((u) => u.email === email);

    if (!user) {
        // User not found
        return res.status(404).json({ error: 'User not found' });
    }

    // Generate a JWT token with the user id and email
    const token = jwt.sign({email}, JWT_SECRET, { expiresIn: '1h' });

    // TODO: Send the reset link with the token via email (use nodemailer or SendGrid)

    // TODO: Send the reset link with the token via email (use nodemailer or SendGrid)
    const resetLink = `http://www.almayas.com.pk/reset-password?token=${token}`;

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: ' ', // Replace with your own Gmail address
                pass: ' ' // Replace with your own Gmail password
            }
        });
        const mailOptions = {
            from: 'ceo@almayas.com.pk',
            to: user.email,
            subject: 'Password Reset Request',
            text: `Hi ${user.email}. Please click on the following link ${resetLink} to reset your password. Link expires in 1 hour.`
        };

        await transporter.sendMail(mailOptions);
            
        res.json({ message: 'Password reset link sent successfully' });
    } catch (error) {
        console.error('Error sending email', error);
        res.status(500).json({ error: 'Error sending email' });
    }
}
);


router.post('/verify', async (req, res) => {
    const { token, newPassword } = req.body;


    try {
        // Verify if the token is valid
        const decoded = jwt.verify(token, JWT_SECRET);

        // Check if user exists in database
        const user = users.find((u) => u.email === decoded.email);

        if (!user) {
            // User not found
            return res.status(404).json({ error: 'User not found' });
        }

        // Update user's password in database

        user.password = newPassword;

        res.json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error verifying token', error);
        res.status(401).json({ error: 'Invalid or expired token' });
    }
}
);





module.exports = router;