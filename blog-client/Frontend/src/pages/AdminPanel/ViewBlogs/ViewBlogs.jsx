import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styles from './ViewBlogs.module.scss';
import SummaryApi from '../../../common';

const ViewBlogs = () => {
  const [posts, setPosts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(SummaryApi.BlogFetchById.url, {
          method: SummaryApi.BlogFetchById.method,
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await response.json();
        setPosts(data.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(SummaryApi.BlogDelete.url, {
        method: SummaryApi.BlogDelete.method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ id }),
      });
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleView = (blog) => {
    setCurrentBlog(blog);
    setModalIsOpen(true);
  };

  return (
    <div className={styles.container}>
      <h2>Your Blogs</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            
            <tr key={post._id}>
              
              <td>{index + 1}. &nbsp; {post.title}</td>
              <td>{new Date(post.date).toLocaleDateString()}</td>
              <td className={styles.actions}>
                <button onClick={() => handleView(post)}>View</button>
                <button onClick={() => handleDelete(post._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          className={styles.modal}
          overlayClassName={styles.overlay}
        >
          <button
            className={styles.closeButton}
            onClick={() => setModalIsOpen(false)}
            aria-label="Close modal"
          >
            &times;
          </button>
          <h3>{currentBlog.title}</h3>
          <p>{currentBlog.content}</p>
        </Modal>
      )}
    </div>
  );
};

export default ViewBlogs;
