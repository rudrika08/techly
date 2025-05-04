import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import SummaryApi from './common';
import Navbar from './layouts/Navbar/Nav';
import Footer from './layouts/Footer/Footer';
import './App.css';
import { Outlet } from 'react-router-dom';
const App = () => {
  const dispatch = useDispatch();
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
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

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <ToastContainer />
      <Navbar />
      <Outlet /> 
      <Footer />
    </>
  );
};

export default App;
