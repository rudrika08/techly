import React from "react";
import './About.css';

const About = () => {
  return (
    <section className="about-section">
      <h2>About R.Patel's Blog</h2>
      <p>I am to inspire others to pursue their coding dreams</p>

      <div className="about-content">
        <div className="about-text">
          <p>Welcome to my personal blog where I share my experience learning to code and the exciting adventures of building a tech startup. Get ready for insightful tutorials, personal reflections, and the highs and lows of entrepreneurship.</p>

          <p>Through my blog, the goal is to inspire people to chase their coding dreams and confidently navigate the startup landscape. I believe that with determination anyone can break through barriers and achieve their goals in the tech world.</p>

          <button>Join the Journey</button>
        </div>

        <img src="/your-image.jpg" alt="About me" />
      </div>
    </section>
  )
}

export default About;
