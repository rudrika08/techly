import React from 'react';
import { Navigate } from 'react-router-dom';
import useLoginCheck from './LoginCheck';
import BlogPage from './../pages/Blogpage/BlogPage';
import Login from './../Authentication/Login/Login';
const api = axios.create({
  baseURL: 'https://blog-by-you.onrender.com/api',
});
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useLoginCheck();
  return isLoggedIn ? <BlogPage /> : <Login />;
};

export default ProtectedRoute;