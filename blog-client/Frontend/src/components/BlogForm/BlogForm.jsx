import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BlogForm.module.scss';
import SummaryApi from '../../common';
import { toast } from 'react-toastify';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blogData = {
      title: title,
      content: content,
      image: image,
    };

    try {
      const response = await fetch(SummaryApi.BlogCreate.url, {
        method: SummaryApi.BlogCreate.method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(blogData),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      toast.success('Blog created successfully');
      setTitle('');
      setContent('');
      setImage('');
      navigate('/');
    } catch (error) {
      toast.error('Error creating blog: ' + error.message);
    }
  };

  return (
    <div className={styles.blogForm}>
      <h2>Create a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            placeholder="Enter image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <button className={styles.submitButton} type="submit">
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
