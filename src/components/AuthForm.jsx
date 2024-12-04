import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginAsync, signupAsync } from '../http/authRoutes';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        acceptedTerms: false,
        isSignup: false,
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const toggleSignup = () => {
        setFormData((prev) => ({ ...prev, isSignup: !prev.isSignup }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password, username, acceptedTerms, isSignup } = formData;

        try {
            if (isSignup) {
                if (!acceptedTerms) {
                    alert("You must accept the terms and conditions to sign up.");
                    return;
                }
                await dispatch(signupAsync({ email, password, username, acceptedTerms })).unwrap();
            } else {
                await dispatch(loginAsync({ email, password })).unwrap();
            }
            navigate('/auth/success');
        } catch (error) {
            navigate('/auth/failure', { state: { message: error } });
        }
    };

    const handleGoogleLogin = () => {
        // Redirect to the backend Google OAuth route
        window.location.href = 'http://localhost:3000/auth/google';
    };

    return (
        <div>
            <h1>{formData.isSignup ? 'Sign Up' : 'Login'}</h1>
            <form onSubmit={handleSubmit}>
                {formData.isSignup && (
                    <>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                        />
                        <div>
                            <input
                                type="checkbox"
                                name="acceptedTerms"
                                checked={formData.acceptedTerms}
                                onChange={handleInputChange}
                                required
                            />
                            <label>I accept the terms and conditions</label>
                        </div>
                    </>
                )}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">
                    {formData.isSignup ? 'Sign Up' : 'Login'}
                </button>
            </form>
            <button onClick={toggleSignup}>
                {formData.isSignup ? 'Already have an account? Login' : 'Create an account'}
            </button>
            <div>
                <button onClick={handleGoogleLogin}>Sign in with Google</button>
            </div>
        </div>
    );
};

export default AuthForm;
