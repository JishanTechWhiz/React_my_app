import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); // Clear messages before new request
        setError('');
        try {
            //const response = await axios.post('http://localhost:5000/api/forgot-password', { email });
            const response = await axios.post('https://react-app-backend-1.onrender.com/api/forgot-password', { email });
            setMessage(response.data.message);

            // Store email in localStorage
            localStorage.setItem('email', email);

            // Navigate to the Verify OTP page
            navigate('/verify-otp');
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow p-4">
                        <h2 className="text-center mb-4">Forgot Password</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Enter your email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    required
                                />
                            </div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary">
                                    Send OTP
                                </button>
                            </div>
                        </form>

                        {message && <div className="alert alert-success mt-3 text-center">{message}</div>}
                        {error && <div className="alert alert-danger mt-3 text-center">{error}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
