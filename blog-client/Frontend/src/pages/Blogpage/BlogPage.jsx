import React, { useEffect, useState } from 'react';
import BlogCard from '../../components/BlogCard/BlogCard';
import styles from './BlogPage.module.scss';
import SummaryApi from '../../common';
import * as motion from 'motion/react-client';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(SummaryApi.BlogFetch.url, {
          method: SummaryApi.BlogFetch.method,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        setPosts(data.data); // Assuming data.data is the array of blog posts
      } catch (error) {
        setError(error.message);
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const renderStars = () => {
    const stars = [];
    const numberOfStars = 100;
    for (let i = 0; i < numberOfStars; i++) {
      const style = {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 3 + 2}s`,
        animationDelay: `${Math.random() * 5}s`,
      };
      stars.push(<div key={`star-${i}`} className={styles.star} style={style}></div>);
    }

    // Add 5 shooting stars
    for (let j = 0; j < 5; j++) {
      const style = {
        top: `${Math.random() * 80}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 10}s`,
      };
      stars.push(
        <div key={`shooting-${j}`} className={styles.shootingStar} style={style}></div>
      );
    }

    return stars;
  };

  return (
    <div className={styles.blogPage}>
      <div className={styles.starryBackground}>{renderStars()}</div>

      <h1 className={styles.heading}>Blog Posts</h1>
      {error && <p className={styles.errorMessage}>{error}</p>}

      <div className={styles.blogList}>
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <motion.div
              key={post.id || index}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 20,
                delay: index * 0.1,
              }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <BlogCard
                title={post.title}
                content={post.content}
                image={post.image}
                author={post.author}
                index={index}
              />
            </motion.div>
          ))
        ) : (
          <center>
            <p style={{ fontSize: '2rem' }}>No blog posts available.</p>
          </center>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
