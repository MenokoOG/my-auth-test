import React from 'react';
import { useLocation } from 'react-router-dom';

const ErrorHandler = () => {
    const location = useLocation();
    const errorMessage = location.state?.message || 'An unknown error occurred';

    return (
        <div>
            <h1>Authentication Failed</h1>
            <p>{errorMessage}</p>
        </div>
    );
};

export default ErrorHandler;
