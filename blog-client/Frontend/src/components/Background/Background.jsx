import React from "react";
import "../Background/Background.css";
import { Link } from "react-router-dom";


export default function DarkBlueBackgroundExample() {
    return (
        <div className="animated-wave-background">
            <div className="glass-card fade-in-up">
                <h1>Welcome to DevDoodles</h1>
                <p>Tech & Life Lessons for Students</p>
                <Link to="/blog">
                    <button className="explore-btn">Explore Blogs</button>
                </Link>
            </div>
            <div className="waves">
                <div className="wave" id="wave1"></div>
                <div className="wave" id="wave2"></div>
                <div className="wave" id="wave3"></div>
                <div className="wave" id="wave4"></div>
            </div>
        </div>
    );
}
