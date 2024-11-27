import React from 'react';
import BlogForm from '../../../components/BlogForm/BlogForm';
import styles from './CreateBlog.module.scss';

const CreateBlog = () => {
  return (
    <div className={styles.container}>
      <BlogForm />
    </div>
  );
};

export default CreateBlog;
