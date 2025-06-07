import React, { useEffect, useState } from 'react';
import BlogCard from '../../components/BlogCard/BlogCard';
import styles from './BlogPage.module.scss';
import LeftSidebar from '../../layouts/Blog/Leftsidebar';
import RightSidebar from '../../layouts/Blog/Rightsidebar';
import posts from '../../../public/data/post.json';  // Adjust path based on your project structure

const BlogPage = () => {
  const [postsData, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [sortOrder, setSortOrder] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    try {
      setPosts(posts);
    } catch (error) {
      setError('Failed to load posts');
    }
  }, []);

  const renderStars = () => {
    const stars = [];
    const numberOfStars = 100;

    for (let i = 0; i < numberOfStars; i++) {
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
        />
      );
    }

    for (let j = 0; j < 5; j++) {
      stars.push(
        <div
          key={`shooting-${j}`}
          className={styles.shootingStar}
          style={{
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        />
      );
    }

    return stars;
  };

  const filteredData = postsData
    .filter((blog) => {
      let authorObj;
      try {
        authorObj = JSON.parse(blog.author);
      } catch (err) {
        authorObj = { department: null };
      }
      return selectedDepartment ? authorObj.department === selectedDepartment : true;
    })
    .filter((blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((blog) => {
      let approvalObj;
      try {
        approvalObj = JSON.parse(blog.approval);
      } catch (err) {
        approvalObj = { status: false };
      }
      return approvalObj.status === true;
    });

  const sortedData = filteredData.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === 'latest' ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className={styles.blogPage}>
      <div className={styles.starryBackground}>{renderStars()}</div> {/* Stars Added Back */}

      <div className={styles.feed}>
        <div className={styles.leftSidebar}>
          <LeftSidebar
            selectedDepartment={selectedDepartment}
            onSelectDepartment={setSelectedDepartment}
            sortOrder={sortOrder}
            onSortOrderChange={setSortOrder}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        <div className={styles.displayFeed}>
          {error && <p className={styles.errorMessage}>{error}</p>}
          {sortedData.length > 0 ? (
            sortedData.map((blog, index) => (
              <BlogCard key={blog.id || index} data={blog} />
            ))
          ) : (
            <p className={styles.errorMessage}>No blogs match your search criteria.</p>
          )}
        </div>

        <div className={styles.rightSidebar}>
          <RightSidebar blogs={sortedData} />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
