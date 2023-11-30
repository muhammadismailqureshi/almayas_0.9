// src/components/ForgotPassword.js

import React, { useState } from 'react';
import axios from 'axios';
import '../../src/App.css';


const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleForgotPassword = async (e) => {
        e.preventDefault();


    
        try {
            setLoading(true);
            const response = await axios.post('/forgot-password/request', { email });
            setMessage(response.data.message);
            setLoading(false);
        } catch (error) {
            console.error('Error requesting forgot password', error);
            setMessage('An error occurred. Please try again later.');
            setLoading(false);
        }
    };

    return (
        <div className="forgot-password-container">
            <h2>Forgot Password</h2>
            <form onSubmit={handleForgotPassword}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Request Password Reset'}</button>
            </form>
            {message && <p className="reset-message">{message}</p>}
        </div>
    );
};








            







export default ForgotPassword;