// import React, { useState } from 'react';
// import axios from 'axios';
// import { useAuth } from '../Auth/AuthContext'; // Import useAuth
// import { useNavigate } from 'react-router-dom';

// const LoginForm = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [message, setMessage] = useState('');
//     const { login } = useAuth(); // Get the login function from AuthContext
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:5000/api/login', {
//                 email,
//                 password,
//             });

           

//             // Optionally, call the login function from AuthContext
//             login(); // Call login on successful login

//             // Show success message and redirect
//             setMessage(response.data.message);
//             navigate('/'); // Redirect to the homepage or profile

//             // Clear the form fields after successful login
//             setEmail('');
//             setPassword('');

//             // Hide the message after 2 seconds
//             setTimeout(() => {
//                 setMessage('');
//             }, 2000);
//         } catch (error) {
//             setMessage(error.response?.data?.message || 'Login failed. Please try again.');
//         }
//     };

//     return (
//         <div className="container mt-5">
//             <h2>Login Form</h2>
//             {message && <div className="alert alert-info">{message}</div>}
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                     <label htmlFor="email" className="form-label">Email</label>
//                     <input
//                         type="email"
//                         className="form-control"
//                         id="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="password" className="form-label">Password</label>
//                     <input
//                         type="password"
//                         className="form-control"
//                         id="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="btn btn-primary">Login</button>
//             </form>
//         </div>
//     );
// };

// export default LoginForm;




import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Auth/AuthContext'; // Import useAuth
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { login } = useAuth(); // Get the login function from AuthContext
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                email,
                password,
            });

            // Call login with the token received from the response
            login(response.data.token);

            setMessage(response.data.message);
            navigate('/'); // Redirect to homepage or profile

            // Clear the form fields after successful login
            setEmail('');
            setPassword('');

            // Hide the message after 2 seconds
            setTimeout(() => {
                setMessage('');
            }, 2000);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Login Form</h2>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
