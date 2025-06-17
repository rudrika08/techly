import React, { useEffect, useState } from "react";
import BlogCard from "../../components/BlogCard/BlogCard";
import styles from "./BlogPage.module.scss";
import posts from "../../../public/data/post.json";

const BlogPage = () => {
  const [postsData, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [sortOrder, setSortOrder] = useState("latest");

  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    try {
      setPosts(posts);
    } catch (error) {
      setError("Failed to load posts.");
    }
  }, []);

  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < 100; i++) {
      stars.push(
        <div
          key={`star-${i}`}
          className={styles.star}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 3 + 2}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        ></div>
      );
    }

    for (let j = 0; j < 5; j++) {
      stars.push(
        <div
          key={`shooting-${j}`}
          className={styles.shootingStar}
          style={{ top: `${Math.random() * 80}%`,
                   left: `${Math.random() * 100}%`,
                   animationDelay: `${Math.random() * 10}s` }}
        ></div>
      );
    }

    return stars;
  };

  const filteredData = postsData
    .filter((blog) => {
      let authorObj = {};
      try {
        authorObj = JSON.parse(blog.author);
      } catch (err) {
        authorObj = { department: null };
      }
      return selectedDepartment ? authorObj.department === selectedDepartment : true;
    })
    .filter((blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      JSON.parse(blog.approval).status === true
    );

  const sortedData = filteredData.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className={styles.blogPage}>
      {/* Starry Background */}
      <div className={styles.starryBackground}>{renderStars()}</div>

      {/* Filter Button */}
    <button
  className={styles.filterBtn}
  onClick={() => setIsFilterOpen((prev) => !prev)}
>
  Filter
</button>

{isFilterOpen && (
  <div className={styles.dropdownMenu}>
    {/* Sort Filter */}
    <select
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}
      className={styles.select}
    >
      <option value="latest">Latest first</option>
      <option value="oldest">Oldest first</option>
    </select>
  </div>
)}

      {/* Blog Cards Grid */}
      <div className={styles.cardGrid}>
        {error && <p className={styles.errorMessage}>{error}</p>}

        {sortedData.length > 0 ? (
          sortedData.map((blog, index) => (
            <BlogCard key={blog.id || index} data={blog} />
          ))
        ) : (
          <p className={styles.errorMessage}>
            No blogs match your search criteria.
          </p>
        )}

      </div>
    </div>
  );
};

export default BlogPage;
