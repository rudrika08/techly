import React, { useState, useEffect, useRef, useReducer } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Nav.css';
import { useSelector, useDispatch } from 'react-redux';
import { setUserDetails } from './../../store/userSlice';
import SummaryApi from '../../common';
import { toast } from 'react-toastify';

const Navbar = () => {
  const user = useSelector(state => state?.user?.user);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const avatarRef = useRef(null);

  // Force re-render when user updates (workaround)
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  // 👇 Force re-render when user state changes
  useEffect(() => {
    forceUpdate();
  }, [user]);

  const handleLogout = async () => {
    try {
      const response = await fetch(SummaryApi.logout.url, {
        method: SummaryApi.logout.method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      } else {
        toast.success(data.message);
        dispatch(setUserDetails(null));
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    if (!user) return;
    setDropdownOpen(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownOpen &&
        dropdownRef.current &&
        avatarRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !avatarRef.current.contains(e.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  useEffect(() => {
    setDropdownOpen(false);
  }, [location.pathname]);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">DevDoodles</Link>
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/blog">Blogs</Link>

        {user && (
          <button className="create-blog-button" onClick={() => navigate('/blogCreate')}>
            Create Blog
          </button>
        )}

        {user ? (
          <div className="navbar-user">
            <div
              className="user-avatar"
              ref={avatarRef}
              onClick={toggleDropdown}
            >
              {user?.profilePic ? (
                <img src={user.profilePic} alt="User" />
              ) : (
                <span>{user?.email?.[0]?.toUpperCase() || user?.username?.[0]?.toUpperCase()}</span>
              )}
            </div>

            {dropdownOpen && (
              <div className="dropdown-menu" ref={dropdownRef}>
                <Link to="/user-details">Profile</Link>
                <Link to="/blogCreate">Create Blog</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
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