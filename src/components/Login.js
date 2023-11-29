// src/components/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../src/App.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();


    /*const simulateLogin = () => {
        // Simulate login request
        if (username === 'user' && password === 'password') {
            setErrorMessage('');
            alert('Login successful');
        } else {
            setErrorMessage('Invalid username or password ! Please try again');
        }
    };*/

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/auth/login', {
                username,
                password
            });

            console.log(response.data); // you might want to  handle the response according to your needs

            // Assuming successfull login, redirect the user to the home page
            navigate('/home');

        } catch (error) {
            console.error('Error logging in', error);
            setErrorMessage('Invalid username or password ! Please try again');
        }
    };        


    const handleSubmmit = (e) => {
        e.preventDefault();
        // Add your logic here to handle login
        //simulateLogin();
        handleLogin();
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