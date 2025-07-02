import React from "react";
import "./Homepage.css";
import video from "../../assets/vd.mp4";

function Home() {
  return (
    <div className="container">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="title">
          Life Is Poetry — Let's<br />
          <span className="title-highlight">Compose It Together</span>
        </h1>
        <div className="title-subtitle">
          Exploring the art of code, one line at a time
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid-container">
        {/* Card 1 - Image */}
        <div className="card-image">
          <div className="image-overlay">
            <div className="overlay-content">
              <h3>Developer Journey</h3>
              <p>Crafting digital experiences</p>
            </div>
          </div>
          <img
            src="https://cdn.prod.website-files.com/66ffb182a2a1dbe73904d0b5/68519f956355379625c99b39_Young-person-typing-with-a-laptop.jpg"
            alt="Developer Typing"
          />
        </div>

        {/* Card 2 - Video */}
        <div className="card-image">
          <div className="image-overlay">
            <div className="overlay-content">
              <h3>Tech Innovation</h3>
              <p>Building tomorrow's solutions</p>
            </div>
          </div>
          <div className="icon-glow">
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="video-logo"
            />
          </div>
        </div>

        {/* Card 3 - Text */}
        <div className="card-text">
          <div className="icon-container">
            <div className="icon-glow">
              <img
                src="https://cdn.prod.website-files.com/66ffb182a2a1dbe73904d0b5/6851a2da737a4d4080d06cf6_download.png"
                alt="Logo"
              />
            </div>
          </div>
          <p className="card-description">
            Together, we'll master the intricacies of programming and rise above the challenges of the tech world
          </p>
          <button className="explore-button">
            <span>Explore More</span>
            <svg className="button-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Blog Section */}
      <div className="blog-section">
        <div className="section-header">
          <h2 className="blog-title">Latest Insights</h2>
          <div className="section-subtitle">Discover stories that inspire and educate</div>
        </div>

        <div className="blog-cards">
          {/* Blog 1 */}
          <div className="blog-card">
            <div className="blog-image-container">
              <img
                src="https://cdn.prod.website-files.com/66ffb182a2a1dbe73904d0b5/6860ec0a51e34a94844ff28c_3-1-1.jpg"
                alt="Innovative Tech"
              />
              <div className="blog-category">Insights</div>
            </div>
            <div className="blog-content">
              <h3>Innovative Tech Solutions: A Founder's Perspective</h3>
              <p>
                In today's rapidly evolving tech landscape, finding innovative solutions to
                complex problems is crucial for the success of any startup...
              </p>
              <div className="blog-meta">
                <span className="read-time">5 min read</span>
              </div>
            </div>
          </div>

          {/* Blog 2 */}
          <div className="blog-card">
            <div className="blog-image-container">
              <img
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
                alt="Startup Tips"
              />
              <div className="blog-category">Tips</div>
            </div>
            <div className="blog-content">
              <h3>Top 5 Tips for Tech Startup Success</h3>
              <p>
                In the ever-evolving world of tech startups, success can often feel elusive.
                However, with the right strategies and mindset, navigating...
              </p>
              <div className="blog-meta">
                <span className="read-time">3 min read</span>
              </div>
            </div>
          </div>

          {/* Blog 3 */}
          <div className="blog-card">
            <div className="blog-image-container">
              <img
                src="https://images.unsplash.com/photo-1517430816045-df4b7de11d1d"
                alt="Mastering Coding"
              />
              <div className="blog-category">Learning</div>
            </div>
            <div className="blog-content">
              <h3>Mastering Coding: A Journey of Learning</h3>
              <p>
                Embarking on the journey of mastering coding can be both challenging and rewarding.
                As a blogger on a mission to share valuable insights...
              </p>
              <div className="blog-meta">
                <span className="read-time">7 min read</span>
              </div>
            </div>
          </div>
        </div>

        <div className="blog-button-container">
          <button className="explore-button secondary">
            <span>View All Posts</span>
            <svg className="button-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
