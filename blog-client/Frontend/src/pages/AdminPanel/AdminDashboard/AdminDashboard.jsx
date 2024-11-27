import React, { useState } from 'react';
import styles from './AdminDashboard.module.scss';
import CreateBlog from '../CreateBlog/CreateBlog';
import ViewBlogs from '../ViewBlogs/ViewBlogs';
import EditProfile from '../EditProfile/EditProfile';
import EditBlog from '../EditBlog/EditBlog';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('createBlog'); // Default tab

  const renderContent = () => {
    switch (activeTab) {
      case 'createBlog':
        return <CreateBlog />;
      case 'viewBlogs':
        return <ViewBlogs />;
      case 'editProfile':
        return <EditProfile />;
      case 'editBlogs':
        return <EditBlog />;
      default:
        return <CreateBlog />;
    }
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.sidebar}>
        <h2>Admin Panel</h2>
        <ul>
          <li
            className={activeTab === 'createBlog' ? styles.active : ''}
            onClick={() => setActiveTab('createBlog')}
          >
            Create Blog
          </li>
          <li
            className={activeTab === 'viewBlogs' ? styles.active : ''}
            onClick={() => setActiveTab('viewBlogs')}
          >
            View Your Blogs
          </li>
          <li
            className={activeTab === 'editProfile' ? styles.active : ''}
            onClick={() => setActiveTab('editProfile')}
          >
            Edit Profile
          </li>
          <li
            className={activeTab === 'editBlogs' ? styles.active : ''}
            onClick={() => setActiveTab('editBlogs')}
          >
            Edit Blogs
          </li>
        </ul>
      </div>
      <div className={styles.content}>{renderContent()}</div>
    </div>
  );
};

export default AdminDashboard;
