import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import authService from '../Auth/Authservice'; // Adjust the path as necessary
import './Signup.css'; // Assuming you have created a Login.css file
import SummaryApi from '../../common/index';
import { toast } from 'react-toastify';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const user = { username, password };
    const response=await fetch(SummaryApi.signup.url, {
      method: SummaryApi.signup.method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    const data = await response.json();
    if (data.error) {
      setError(data.error);
      toast.error(data.error);
    } else {
      toast.success('User created successfully');
      navigate('/login'); 

    }
  };

  return (
    <div className="signup-form">
      <h2>Sign Up</h2>
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
        <button type="submit">Sign Up</button>
      </form>
      <p className="login-prompt">
        Already have an account?{' '}
        <span
          className="login-link"
          onClick={() => navigate('/login')} // Navigate to the login page
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default Signup;
