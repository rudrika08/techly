import React, { useState } from "react";
import { motion } from "framer-motion";
import "./BlogCard.css";

const BlogCard = ({ data }) => {
  const { title, content, image, author } = data;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = (e) => {
    e.stopPropagation();
    setIsModalOpen((prev) => !prev);
  };

  return (
    <>
      <motion.div
        className="blog-card"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ amount: 0.3, once: true }}
        variants={cardVariants}
        onClick={toggleModal}
      >
        {image && <img src={image} alt={title} className="blog-card-image" />}
        <h2 className="blog-card-title">
          {title || "Untitled Blog"}
        </h2>
        <p className="blog-card-content">
          {content ? content.slice(0, 100) + "…" : "No content available."}
        </p>
        <p className="blog-card-author">
          {author ? `Author: ${author}` : "Unknown"}
        </p>
        <button
          className="blog-card-button"
          onClick={(e) => {
            e.stopPropagation();
            toggleModal(e);
          }}>
          Read More
        </button>
      </motion.div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div
            className="modal-full-content"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="modal-close" onClick={toggleModal}>
              &times;
            </span>
            <h2>{title || "Untitled Blog"}</h2>
            {image && <img src={image} alt={title} />}
            <p>{content || "No content available."}</p>
            <p>Author: {author ? author : "Unknown"}</p>
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
