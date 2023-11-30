// routes/forgotPassword.js

const express = require('express');
const router = express.Router();
const crypto = require('crypto');



const users = [
    { id: 1, email: 'ceo@almayas.com.pk', password: 'hashedpassword' },
    //Add more users here

];


// POST route to request a password reset

router.post('/request', async (req, res) => {
    const { email } = req.body;

        // Find the user associated with the provided email
    
    
    const user =users.find((u) => u.email === email);
    if (!user) {
        // User not found
        return res.status(404).json({ error: 'User not found' });
    }

    crypto.randomBytes(32).toString('hex');

    //TODO: Send the reset link with the token via email (use nodemailer or SendGrid)

    res.json({ message: 'Password reset link sent successfully' });
}
);

module.exports = router;
