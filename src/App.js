import './App.css';
import Navbar from './MyComponent/Navbar';
import Home from './MyComponent/Home';
import Footer from './MyComponent/Footer';
import Register from './API/SignupForm';
import Login from './API/LoginForm';
import Profile from './API/ProfilePage';
import {Todos} from './MyComponent/Todos' //Export Arrow Function use this...

import { useAuth } from './Auth/AuthContext'; // Import useAuth
import {BrowserRouter as Router,Route,Routes,Navigate} from "react-router-dom";

import ForgotPassword from './API/ForgotPassword';
import VerifyOTP from './API/VerifyOTP';
import ResetPassword from './API/ResetPassword';
import CricketOrg from './API/CricketOrg';

import PayPalPayment from './API/PayPalPayment';






function App() {

  const { isAuthenticated } = useAuth(); // Get authentication status

  return (
    <Router>
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos" element={<Todos />} />
        {/* <Route path="/registerPage"  element={<Register />} /> */}
        <Route path="/registerPage" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
        <Route path="/LoginPage" element={<Login />} />
        <Route path="/ProfilePage" element={<Profile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/cricket-org" element={<CricketOrg />} />
        <Route path="/paypal-payment" element={<PayPalPayment />} />
      </Routes>
      <Footer />
    </>
  </Router>
  );
}

export default App;
