// src/components/Login.js

import React, { useState } from 'react';
import '../../src/App.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const simulateLogin = () => {
        // Simulate login request
        if (username === 'user' && password === 'password') {
            setErrorMessage('');
            alert('Login successful');
        } else {
            setErrorMessage('Invalid username or password ! Please try again');
        }
    };

        


    const handleSubmmit = (e) => {
        e.preventDefault();
        // Add your logic here to handle login
        simulateLogin();
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>

                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default Login;

