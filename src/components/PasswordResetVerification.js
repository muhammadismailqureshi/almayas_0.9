// src/components/PasswordResetVerification.js

import React, { useState } from 'react';
import axios from 'axios';
import '../../src/App.css';


const PasswordResetVerification = () => {
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handlePasswordResetVerification = async (e) => {
        e.preventDefault();
        
        try {
            // Make a request to the backend endpoint for password reset verification
            const response = await axios.post('/password-reset/verify', { token, newPassword });
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error verifying password reset', error);
            setMessage('Error verifying password reset. Please try again later.');
        }
    };


    return (
        <div className="password-reset-verfication-container">
            <h2>Password Reset Verification</h2>
            <form onSubmit={handlePasswordResetVerification}>
                <label htmlFor="token">Verification Token:</label>
                <input
                    type="text"
                    id="token"
                    name="token"
                    value={token}
                    placeholder="Enter your verification token"
                    onChange={(e) => setToken(e.target.value)}
                    required
                />
                <label htmlFor="newPassword">New Password:</label>
                <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={newPassword}
                    placeholder="Enter your new password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
            {message && <p className="reset-message">{message}</p>}
        </div>
    );
}


export default PasswordResetVerification;

