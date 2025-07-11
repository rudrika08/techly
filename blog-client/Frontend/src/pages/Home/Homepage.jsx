import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";
import video from "../../assets/vd.mp4";
import SummaryApi from "../../common";

function Home() {
  const [latestBlogs, setLatestBlogs] = useState([]);

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const response = await fetch(SummaryApi.BlogFetch.url, {
          method: SummaryApi.BlogFetch.method,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        if (result.success) {
          const sorted = result.data
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 3);
          setLatestBlogs(sorted);
        } else {
          console.error("Failed to fetch blogs:", result.message);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchLatestBlogs();
  }, []);

  return (
    <div className="container">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="title">
          Code the Future — One<br />
          <span className="title-highlight"> Byte at a Time</span>
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
            <div className="icon-glows">
              <img
                src="https://cdn.prod.website-files.com/66ffb182a2a1dbe73904d0b5/6851a2da737a4d4080d06cf6_download.png"
                alt="Logo"
              />
            </div>
          </div>
          <p className="card-description">
            Together, we'll master the intricacies of programming and rise above the challenges of the tech world
          </p>
          <Link to="/blog" className="explore-button">
            <span>Explore More</span>
            <svg className="button-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Blog Section */}
      <div className="blog-section">
        <div className="section-header">
          <h2 className="blog-title">Latest Insights</h2>
          <div className="section-subtitle">Discover stories that inspire and educate</div>
        </div>

        <div className="blog-cards">
          {latestBlogs.map((blog, index) => (
            <div className="blog-card" key={blog._id || index}>
              <div className="blog-image-container">
                <img src={blog.image || "fallback.jpg"} alt={blog.title} />
                <div className="blog-category">{blog.category || "General"}</div>
              </div>
              <div className="blog-content">
                <h3>{blog.title}</h3>
                <p>
                  {blog.description?.length > 150
                    ? blog.description.slice(0, 150) + "..."
                    : blog.description}
                </p>
                <div className="blog-meta">
                  <span className="read-time">
                    {blog.readTime || "3 min read"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="blog-button-container">
          <Link to="/blog" className="explore-button secondary">
            <span>View All Posts</span>
            <svg className="button-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
