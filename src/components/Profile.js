// Profile.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../src/App.css';



const Profile = () => {
    const [userProfile, setUserProfile] = useState({});

    useEffect(() => {
        // Fetch the user profile information from the database

        axios.get('/api/profile')
            .then(response => setUserProfile(response.data))
            .catch(error => console.error('Error fetching profile: ', error));
    } , []);

    if (!userProfile) {
        return <div>Loading profile...</div>;
    }

    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            <p> Username: {userProfile.username} </p>
            <p> Email: {userProfile.email} </p>
        </div>
    );
};

export default Profile;

        