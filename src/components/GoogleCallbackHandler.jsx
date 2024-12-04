import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GoogleCallbackHandler = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleGoogleCallback = async () => {
            try {
                // Fetch the current location's search params
                const params = new URLSearchParams(window.location.search);

                // Get the token directly from the backend
                const response = await axios.get('http://localhost:3000/auth/google/callback', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true, // Ensure cookies are passed if needed
                });

                const { access_token, user } = response.data;

                // Save the token and user to localStorage
                localStorage.setItem('token', access_token);
                localStorage.setItem('user', JSON.stringify(user));

                console.log('Google login successful:', { access_token, user });

                // Navigate to a protected route or dashboard
                navigate('/dashboard');
            } catch (err) {
                console.error('Error during Google login:', err.response?.data || err.message);
                setError('Failed to authenticate with Google.');
            }
        };

        handleGoogleCallback();
    }, [navigate]);

    if (error) {
        return (
            <div>
                <h1>Error</h1>
                <p>{error}</p>
            </div>
        );
    }

    return <div>Processing login...</div>;
};

export default GoogleCallbackHandler;
