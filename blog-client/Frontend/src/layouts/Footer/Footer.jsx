// src/layouts/Footer/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__section">
          <h4>About Us</h4>
          <ul>
            <li><a href="/about">Our Story</a></li>
            <li><a href="/team">Team</a></li>
            <li><a href="/careers">Careers</a></li>
          </ul>
        </div>
        <div className="footer__section">
          <h4>Contact Us</h4>
          <ul>
            <li><a href="/contact">Contact Form</a></li>
            <li><a href="mailto:support@blogapp.com">Email Us</a></li>
            <li><a href="tel:+1234567890">Call Us</a></li>
          </ul>
        </div>
        <div className="footer__section">
          <h4>Follow Us</h4>
          <ul>
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          </ul>
        </div>
        <div className="footer__section">
          <h4>Legal</h4>
          <ul>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} BlogApp. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
