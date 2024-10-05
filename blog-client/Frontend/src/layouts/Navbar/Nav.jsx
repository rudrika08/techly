import React, { useState, useEffect,useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import authService from '../../Authentication/Auth/Authservice';
import './Nav.css'; // Assume the CSS is already created
import { useSelector, useDispatch } from 'react-redux';
import { setUserDetails } from './../../store/userSlice';
import SummaryApi from '../../common';
import { toast } from 'react-toastify';


const Navbar = () => {
  const user = useSelector(state => state?.user?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout=async()=>{
    try{
      const response = await fetch(SummaryApi.logout.url, {
        method: SummaryApi.logout.method,
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
        toast.error(data.message);
      } else {
        toast.success(data.message);
        dispatch(setUserDetails(null));
       navigate('/login');
      }

    }catch(error){
      toast.error(error.message);
      console.log(error);
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Blog App</Link>
      </div>
      
      <div className="navbar-links">
        {user && (
          <Link to='/user-details' className="user-details">
            <p>{user.username}</p>
          </Link>
        )}
        <Link to="/">Home</Link>
        {user && (
          <button className="create-blog-button" onClick={() => navigate('/create-blog')}>
            Create Blog
          </button>
        )}
        {user ? (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button className="login-button" onClick={() => navigate('/login')}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
