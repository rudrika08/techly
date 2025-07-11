import React, { useEffect, useState, useRef } from "react";
import BlogCard from "../../components/BlogCard/BlogCard";
import SearchIcon from "../../components/Icons/SearchIcon";
import FilterIcon from "../../components/Icons/FilterIcon";
import "./BlogPage.css";
import SummaryApi from "../../common";

// Custom hook for scroll blur effect
const useScrollBlur = (maxScroll = 300, maxBlur = 10) => {
  const [blurValue, setBlurValue] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const blur = Math.min((scrolled / maxScroll) * maxBlur, maxBlur);
      setBlurValue(blur);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [maxScroll, maxBlur]);

  return blurValue;
};

const BlogPage = () => {
  const [postsData, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  // Use the scroll blur hook
  const blurValue = useScrollBlur(300, 10);

  // Handle scroll for parallax effects
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch(SummaryApi.BlogFetch.url, {
          method: SummaryApi.BlogFetch.method,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.message || "Failed to fetch blogs.");
        }

        setPosts(result.data || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to load posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredData = postsData.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedData = filteredData.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
  });

  if (loading) {
    return (
      <div className="blog-page">
        {/* Enhanced Loading State */}
        <div className="loading-container">
          <div className="loading-animation">
            <div className="loading-spinner-modern">
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
            </div>
            <div className="loading-pulse">
              <div className="pulse-dot"></div>
              <div className="pulse-dot"></div>
              <div className="pulse-dot"></div>
            </div>
          </div>
          <h1 className="loading-title">
            <span className="loading-text-effect">Discovering Amazing Content</span>
          </h1>
          <p className="loading-subtitle">Please wait while we fetch the latest blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-page">
      {/* Background Effects with Blur */}
      <div
        className="bg-effects"
        style={{
          filter: `blur(${blurValue}px)`,
          transition: 'filter 0.1s ease-out'
        }}
      >
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
        <div className="gradient-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>
      </div>
      {/* Static Hero Section */}
      <div
        className="hero-section"
        ref={heroRef}
        style={{
          filter: `blur(${blurValue * 0.5}px)`,
          transition: 'filter 0.1s ease-out'
        }}
      >

        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-icon">✨</span>
            <span>Discover Insights</span>
          </div>

          <h1 className="page-title">
            <span className="title-main">Our</span>
            <span className="title-accent">Blogs</span>
            <div className="title-underline"></div>
          </h1>

          <p className="page-subtitle">
            Explore cutting-edge insights, tutorials, and stories from our community of innovators
          </p>

          {/* Quick Stats */}
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">{sortedData.length}</span>
              <span className="stat-label">Articles</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Readers</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">Weekly</span>
              <span className="stat-label">Updates</span>
            </div>
          </div>
        </div>

        {/* Animated Elements */}
        <div className="hero-decoration">
          <div className="floating-elements">
            <div className="floating-card card-1">
              <div className="card-glow"></div>
            </div>
            <div className="floating-card card-2">
              <div className="card-glow"></div>
            </div>
            <div className="floating-card card-3">
              <div className="card-glow"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Controls Section */}
      <div className="controls-section">
        <div className="controls-wrapper">
          {/* Search with Glass Effect */}
          <div className="search-container">
            <div className="search-glass-effect"></div>
            <SearchIcon />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button
                className="search-clear"
                onClick={() => setSearchQuery("")}
              >
                ×
              </button>
            )}
          </div>

          {/* Enhanced Filter Controls */}
          <div className="filter-controls">
            {/* View Mode Toggle */}
            <div className="view-toggle">
              <button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
              </button>
              <button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="List View"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
              </button>
            </div>

            {/* Sort Filter */}
            <div className="filter-container">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`filter-btn ${isFilterOpen ? 'active' : ''}`}
              >
                <FilterIcon />
                <span>Sort</span>
                <svg
                  className={`filter-arrow ${isFilterOpen ? 'rotated' : ''}`}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </button>

              {isFilterOpen && (
                <div className="filter-dropdown">
                  <div className="dropdown-header">
                    <span>Sort By</span>
                  </div>
                  <div className="dropdown-options">
                    <label className="filter-option">
                      <input
                        type="radio"
                        name="sort"
                        value="latest"
                        checked={sortOrder === "latest"}
                        onChange={(e) => setSortOrder(e.target.value)}
                      />
                      <span className="option-text">Latest First</span>
                      <span className="option-check">✓</span>
                    </label>
                    <label className="filter-option">
                      <input
                        type="radio"
                        name="sort"
                        value="oldest"
                        checked={sortOrder === "oldest"}
                        onChange={(e) => setSortOrder(e.target.value)}
                      />
                      <span className="option-text">Oldest First</span>
                      <span className="option-check">✓</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="error-container">
          <div className="error-card">
            <div className="error-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <div className="error-content">
              <h3>Oops! Something went wrong</h3>
              <p>{error}</p>
              <button
                className="retry-btn"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="content-section">
        {/* Enhanced Stats Bar */}
        <div className="stats-bar">
          <div className="stats-left">
            <span className="blog-count">
              <span className="count-number">{sortedData.length}</span>
              <span className="count-text">
                {sortedData.length === 1 ? 'Article' : 'Articles'}
              </span>
            </span>
            {searchQuery && (
              <span className="search-info">
                <span className="search-icon">🔍</span>
                Results for "<strong>{searchQuery}</strong>"
              </span>
            )}
          </div>

          <div className="stats-right">
            <div className="trending-indicator">
              <span className="trending-icon">🔥</span>
              <span>Trending Now</span>
            </div>
          </div>
        </div>

        {/* Blog Grid/List */}
        <div className={`blog-container ${viewMode}`}>
          {sortedData.length > 0 ? (
            sortedData.map((blog, index) => (
              <div
                key={blog.id || index}
                className="blog-card-wrapper"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  '--index': index
                }}
              >
                <BlogCard blog={blog} viewMode={viewMode} />
              </div>
            ))
          ) : (
            !error && (
              <div className="empty-state">
                <div className="empty-animation">
                  <div className="empty-icon">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14,2 14,8 20,8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10,9 9,9 8,9" />
                    </svg>
                  </div>
                </div>
                <h3 className="empty-title">
                  {searchQuery ? "No matches found" : "No blogs available"}
                </h3>
                <p className="empty-description">
                  {searchQuery
                    ? "Try adjusting your search terms or explore different topics."
                    : "Check back soon for fresh content and insights from our community."
                  }
                </p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="clear-search-btn"
                  >
                    <span>Clear Search</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="1,4 1,10 7,10" />
                      <path d="M3.51,15a9,9,0,0,0,13.48-3.51" />
                    </svg>
                  </button>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;