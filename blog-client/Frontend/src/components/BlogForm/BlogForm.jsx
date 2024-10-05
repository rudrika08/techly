import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BlogForm.css';
import SummaryApi from '../../common';
import { toast } from 'react-toastify';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(''); // Change to string for URL input
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blogData = {
      title: title,
      content: content,
      image: image
    };

    try {
      // Send the blog data to the backend
      const response = await fetch(SummaryApi.BlogCreate.url, {
        method: SummaryApi.BlogCreate.method,
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(blogData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Show success message
      toast.success('Blog created successfully');
      setTitle('');
      setContent('');
      setImage(''); // Reset image URL
      navigate('/'); // Navigate to home after success
    } catch (error) {
      console.error('Error creating blog:', error);
      toast.error('Error creating blog: ' + error.message);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.value); // Set the image URL directly
  };

  return (
    <div className="blog-form">
      <h2>Create a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            placeholder="Enter image URL"
            value={image}
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
};

export default BlogForm;
