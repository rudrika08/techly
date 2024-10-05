import React, { useState ,useContext,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
// import authService from '../Auth/Authservice'; // Adjust the path as necessary
import './Login.css'; // Assuming you have created a Login.css file
import SummaryApi from '../../common';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './../../store/userSlice';
// import Cookies from 'js-cookie';
// import {CounterContext} from './../../context/index';

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState(''); // Changed from email to username
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('fetchUser', token);
      const response = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (response.status === 401) {
        throw new Error('Unauthorized: No token provided or invalid token');
      }

      const data = await response.json();
      dispatch(setUserDetails(data.user));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
  
    try {
      const response = await fetch(SummaryApi.login.url, {
        method: SummaryApi.login.method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include' 
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Something went wrong');
        toast.error(errorData.message || 'Something went wrong');
        return; 
      }
  
      const data = await response.json();
  
      // If login is successful
      toast.success('User logged in successfully');
      // dispatch(setUserDetails(data.user));
      // userFetch();
      fetchUser(); // Fetch user details after successful login
      navigate('/'); // Redirect to the home page
  
    } catch (error) {
      setError('Network error. Please try again later.');
      toast.error('Network error. Please try again later.');
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="login-form">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p className="signup-prompt">
        Don't have an account?{' '}
        <span
          className="signup-link"
          onClick={() => navigate('/signup')} // Navigate to the sign-up page
        >
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default Login;
