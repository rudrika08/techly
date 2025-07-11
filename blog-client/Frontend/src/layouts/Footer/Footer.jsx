// src/layouts/Footer/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__brand">
          <h2 className="footer__logo">Syntrax<span className="footer__logo-dot">.</span></h2>
          <p className="footer__tagline">
            Exploring the art of code, one line at a time
          </p>
        </div>
        
        <div className="footer__content">
          <div className="footer__section">
            <h4>About Us</h4>
            <ul>
              <li><a href="/about">Our Story</a></li>
              <li><a href="/team">Team</a></li>
              <li><a href="/careers">Careers</a></li>
              <li><a href="/mission">Mission</a></li>
            </ul>
          </div>
          
          <div className="footer__section">
            <h4>Resources</h4>
            <ul>
              <li><a href="/tutorials">Tutorials</a></li>
              <li><a href="/documentation">Documentation</a></li>
              <li><a href="/community">Community</a></li>
              <li><a href="/newsletter">Newsletter</a></li>
            </ul>
          </div>
          
          <div className="footer__section">
            <h4>Contact</h4>
            <ul>
              <li><a href="/contact">Contact Form</a></li>
              <li><a href="mailto:hello@syntrax.com">hello@syntrax.com</a></li>
              <li><a href="tel:+1234567890">+1 (234) 567-890</a></li>
            </ul>
          </div>
          
          <div className="footer__section">
            <h4>Connect</h4>
            <ul>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="https://discord.com" target="_blank" rel="noopener noreferrer">Discord</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer__newsletter">
          <h4>Stay Updated</h4>
          <p>Get the latest coding insights and tutorials delivered to your inbox.</p>
          <div className="footer__newsletter-form">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="footer__newsletter-input"
            />
            <button className="footer__newsletter-btn">Subscribe</button>
          </div>
        </div>
      </div>
      
      <div className="footer__bottom">
        <div className="footer__bottom-content">
          <p>&copy; {new Date().getFullYear()} Syntrax. All rights reserved.</p>
          <div className="footer__legal">
            <a href="/privacy">Privacy Policy</a>
            <span className="footer__divider">•</span>
            <a href="/terms">Terms of Service</a>
            <span className="footer__divider">•</span>
            <a href="/cookies">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;