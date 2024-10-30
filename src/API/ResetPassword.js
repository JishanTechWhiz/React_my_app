import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
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
            // const response = await axios.post('http://localhost:5000/api/reset-password', { email, newPassword });
            const response = await axios.post('https://react-app-backend-1.onrender.com/api/reset-password', { email, newPassword });
            
            setMessage(response.data.message);

            // Clear email from localStorage
            localStorage.removeItem('email');
            
            // Navigate to Login page after success
                navigate('/LoginPage');
            
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred');
        }
    };

 
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow p-4">
                        <h2 className="text-center mb-4">Reset Password</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="newPassword" className="form-label">New Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="newPassword"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter new password"
                                    required
                                />
                            </div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary">Reset Password</button>
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

export default ResetPassword;
