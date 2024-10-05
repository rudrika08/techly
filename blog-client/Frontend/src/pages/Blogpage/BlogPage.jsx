import React, { useEffect, useState } from 'react';
import BlogCard from '../../components/BlogCard/BlogCard';
import styles from './BlogPage.module.scss';
import SummaryApi from '../../common';

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
        setPosts(data.data); // Assuming `data.data` contains the array of blog posts
      } catch (error) {
        setError(error.message);
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className={styles.blogPage}>
      <h1 className={styles.heading}>Blog Posts</h1>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <div className={styles.blogList}>
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <BlogCard
              key={post.id || index}
              title={post.title}
              content={post.content}
              image={post.image}
              author={post.author}
            />
          ))
        ) : (
          <p>No blog posts available.</p>
        )}
      </div>
    </div>

  );
};

export default BlogPage;
