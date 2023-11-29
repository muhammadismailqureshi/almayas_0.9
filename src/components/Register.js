// src/components/Register.js

import React, { useState } from 'react';
import axios from 'axios';
import '../../src/App.css';


const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    /*const simulateRegistration = () => {
        // Simulate register request
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match ! Please try again');
        } else {
            setErrorMessage('');
            // Add your logic here to handle registration
            alert('Registration successful');
        }
    };*/

    const handleRegister = async () => {
        try {
            const response = await axios.post('/api/auth/register', {
                username,
                password,
                confirmPassword,
            });

            console.log(response.data); // you might want to  handle the response according to your needs

            // Assuming successfull registration, redirect the user to the login page
            // or display a message saying registration was successful

        } catch (error) {
            console.error('Error during registration', error);
            setErrorMessage('Error during registration ! Please try again');
        }
    };

    const handleSubmmit = (e) => {
        e.preventDefault();
        // Add your logic here to handle registration
        //simulateRegistration();
        handleRegister();
    };


    return (
        <div className="register-container">
            <h2>Register</h2>
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
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>

                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
        </div>
    );
}

export default Register;

            



            