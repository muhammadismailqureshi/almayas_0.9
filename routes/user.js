// routes/user.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth'); //implement middleware for authentication


// Profile endpoint
router.get('/profile', authMiddleware, (req, res) => {
    //  Fetch the user profile information from the database

    const userProfile = {
        username: req.user.username,
        email: req.user.email
    };

    res.json(userProfile);

});

        
        
module.exports = router;





