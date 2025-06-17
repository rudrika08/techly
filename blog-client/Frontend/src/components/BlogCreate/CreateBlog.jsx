import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './CreateBlog.scss'; 

const categories = [
    'All Categories',
    'Tech & Programming',
    'Business & Finance',
    'Health & Fitness',
    'Travel & Adventure',
    'Lifestyle & Fashion',
    'Food & Cooking',
];

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const navigate = useNavigate();

   const handleSubmit = async (e) => {
  const token = localStorage.getItem('token');
  e.preventDefault();

  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/blogCreate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify({
        title,
        content,
        image,
        category: selectedCategory,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create blog');
    }

    toast.success('Blog created successfully!');
    navigate('/');
  } catch (error) {
    toast.error(error.message || 'Error creating blog');
  }
};


    return (
        <div className="CreateBlog">
            <h2>Create New Blog</h2>
            <form onSubmit={handleSubmit}>
                <div className="formGroup">
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="formGroup">
                    <label>Category:</label>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="formGroup">
                    <label>Image URL:</label>
                    <input
                        type="url"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        required
                    />
                </div>

                <div className="formGroup">
                    <label>Content:</label>
                    <ReactQuill
                        value={content}
                        onChange={setContent}
                        className="quillEditor"
                    />
                </div>

                <button type="submit" className="submitButton">
                    Create Blog
                </button>
            </form>
        </div>
    );
};

export default CreateBlog;
