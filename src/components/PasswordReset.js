// src/components/PasswordReset.js

import React, { useState } from 'react';
import axios from 'axios';
import '../../src/App.css';


const PasswordReset = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        try {

            // Make a request to the backend endpoint for password reset
            const response =await axios.post('/password-reset/request', { email });
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error requesting password reset', error);
            setMessage('Error requesting password reset. Please try again later.');
        }
    };

    return (
        <div className="password-reset-container">
            <h2>Password Reset</h2>
            <form onSubmit={handlePasswordReset}>
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
                <button type="submit">Request Password Reset</button>
            </form>
            {message && <p className="reset-message">{message}</p>}
        </div>
    );
};

export default PasswordReset;


