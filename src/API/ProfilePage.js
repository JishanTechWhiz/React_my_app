import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: ''
    });
    const [editMode, setEditMode] = useState(false);
    const [message, setMessage] = useState('');

    // Fetch user profile on component mount
    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setMessage('No token found. Please log in.');
                return;
            }

            try {
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                const response = await axios.get('http://localhost:5000/api/profile', config);
                setUserData(response.data);
            } catch (error) {
                setMessage('Failed to fetch profile.');
            }
        };

        fetchProfile();
    }, []);

    // Handle form submission for updating profile
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            setMessage('No token found. Please log in.');
            return;
        }

        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const response = await axios.put('http://localhost:5000/api/profile', userData, config);
            setMessage(response.data.message); // Show success message
            setEditMode(false); // Exit edit mode
        } catch (error) {
            setMessage('Failed to update profile.');
        }
    };

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    return (
        <div className="container mt-5">
            <h2>Profile Page</h2>
            {message && <div className="alert alert-info">{message}</div>}

            {editMode ? (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={userData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                </form>
            ) : (
                <div>
                    <p><strong>Name:</strong> {userData.name}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <button onClick={() => setEditMode(true)} className="btn btn-primary">Edit Profile</button>
                </div>
            )}
        </div>
    );
};

export default Profile;
