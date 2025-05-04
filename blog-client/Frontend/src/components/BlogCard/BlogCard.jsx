import React, { useState } from 'react';
import * as motion from "motion/react-client";
import './BlogCard.css';

const BlogCard = ({ title, content, image, author, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <motion.div
        className="blog-card"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ amount: 0.3, once: true }}
        variants={cardVariants}
      >
        {image && <img src={image} alt={title || 'Blog Post'} className="blog-card-image" />}
        <h2 className="blog-card-title">{title || 'Untitled Post'}</h2>
        <p className="blog-card-content">{content || 'No content available.'}</p>
        <p className="blog-card-author">Author: {author || 'Unknown'}</p>
        <button className="blog-card-button" onClick={toggleModal}>Read More</button>
      </motion.div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-full-content" onClick={(e) => e.stopPropagation()}>
            <span className="modal-close" onClick={toggleModal}>&times;</span>
            <h2>{title || 'Untitled Post'}</h2>
            {image && <img src={image} alt={title} className="modal-image" />}
            <p>{content || 'No content available.'}</p>
            <p>Author: {author || 'Unknown'}</p>
          </div>
        </div>
      )}
    </>
  );
};

const cardVariants = {
  offscreen: {
    y: 200,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    rotate: 0,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

export default BlogCard;
