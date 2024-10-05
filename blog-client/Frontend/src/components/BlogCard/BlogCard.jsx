import React, { useState } from 'react';
import './BlogCard.css';

const BlogCard = ({ title, content, image, author }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="blog-card">
        {image && <img src={image} alt={title || 'Blog Post'} className="blog-card-image" />}
        <h2 className="blog-card-title">{title || 'Untitled Post'}</h2>
        <p className="blog-card-content">{content || 'No content available.'}</p>
        <p className="blog-card-author">Author: {author || 'Unknown'}</p>
        <button className="blog-card-button" onClick={toggleModal}>Read More</button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-full-content" onClick={(e) => e.stopPropagation()}>
            <span className="modal-close" onClick={toggleModal}>&times;</span>
            <h2>{title || 'Untitled Post'}</h2>
            <img src={image} alt={title} className="modal-image"/>
            <p>{content || 'No content available.'}</p>
            <p>Author: {author || 'Unknown'}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogCard;
