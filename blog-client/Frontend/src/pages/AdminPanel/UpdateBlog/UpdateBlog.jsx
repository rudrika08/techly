import React, { useEffect, useState,useContext } from 'react';
import styles from './UpdateBlog.module.scss';
import { useParams } from 'react-router-dom';
import SummaryApi from '../../../common';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { BlogContext } from './../../../context/BlogContext';

const UpdateBlog = () => {
  const { fetchBlog } = useContext(BlogContext);
  const { id } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset, 
    formState: { errors },
  } = useForm();

  // Fetch blog data
  const fetchBlogFn = async () => {
    try {
      const response = await fetch(SummaryApi.BlogFetchByBlogId.url, {
        method: SummaryApi.BlogFetchByBlogId.method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      setValue('title', data.data.title);
      setValue('content', data.data.content);
      setValue('image', data.data.image);

      reset({
        title: data.data.title,
        content: data.data.content,
        image: data.data.image,
      });

      setIsLoaded(true); // Mark as loaded after setting the values
    } catch (error) {
      console.error('Error fetching blog:', error);
    }
  };

  useEffect(() => {
    fetchBlogFn();
  }, [id]);

  const onSubmit = async (data) => {
    console.log('Updated Data:', data);
    try {
      const response = await fetch(SummaryApi.BlogEdit.url, {
        method: SummaryApi.BlogEdit.method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ ...data, id }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedData = await response.json();
      console.log(updatedData);

      fetchBlog();
      toast.success('Blog Updated Successfully');
    } catch (error) {
      console.error('Error updating blog:', error);
      toast.error('Failed to update blog');
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>; 
  }

  return (
    <div className={styles.container}>
      <h1>Update Blog</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">Title:</label>
        <input
          {...register('title', { required: true })}
          placeholder="Title"
        />
        {errors.title && <p className={styles.error}>Title is required</p>}

        <label htmlFor="content">Content:</label>
        <textarea
          {...register('content', { required: true })}
          placeholder="Content"
        />
        {errors.content && <p className={styles.error}>Content is required</p>}

        <label htmlFor="image">Image URL:</label>
        <input
          {...register('image', { required: true })}
          placeholder="Image URL"
        />
        {errors.image && <p className={styles.error}>Image URL is required</p>}

        <button type="submit" className={styles.updateButton}>Update Blog</button>
      </form>
    </div>
  );
};

export default UpdateBlog;
