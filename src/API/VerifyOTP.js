import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VerifyOTP = () => {
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Retrieve email from localStorage
    const email = localStorage.getItem('email');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const response = await axios.post('http://localhost:5000/api/verify-otp', { email, otp });
            setMessage(response.data.message);

            // Navigate to Reset Password page
            navigate('/reset-password');
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    if (!email) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger text-center">
                    No email found. Please start the process from the <a href="/forgot-password">Forgot Password</a> step.
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow p-4">
                        <h2 className="text-center mb-4">Verify OTP</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="otp" className="form-label">Enter the OTP sent to your email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="otp"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter OTP"
                                    required
                                />
                            </div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-success">Verify OTP</button>
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

export default VerifyOTP;
