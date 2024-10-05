import React, { useEffect, useState, useContext } from 'react';
import SummaryApi from '../../common';
import styles from './AdminPanel.module.scss';
import { MdEdit, MdDeleteForever } from "react-icons/md";
import { toast } from 'react-toastify'; 
import { Link, Outlet } from 'react-router-dom';
import { BlogContext } from './../../context/BlogContext';

const AdminPanel = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    const fetchBlog = async () => {
        try {
            const response = await fetch(SummaryApi.BlogFetchById.url, {
                method: SummaryApi.BlogFetchById.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.json();
            setPosts(data.data);
        } catch (error) {
            setError(error.message);
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        fetchBlog();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(SummaryApi.BlogDelete.url, {
                method: SummaryApi.BlogDelete.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            fetchBlog();
            toast.success('Blog post deleted successfully');
        } catch (error) {
            console.error('Error deleting post:', error);
            toast.error('Failed to delete the blog post');
        }
    };

    return (
        <div>
            <h2>Admin Panel</h2>
            <BlogContext.Provider value={{ fetchBlog }}> 
                <div className={styles.adminPanel}>
                    <div className={styles.adminPanelList}>
                        {error && <p className={styles.error}>{error}</p>}
                        {posts.length > 0 ? (
                            posts.map((post, index) => (
                                <div className={styles.adminPanelItem} key={post.id || index}>
                                    <h3>{post.title}</h3>
                                    
                                    {post.image && <img src={post.image} alt={post.title} />}
                                    <p>{post.content}</p>
                                    {/* Button div moved below the content */}
                                    <div className={styles.buttonContainer}>
                                        <Link to={`/user-details/edit/${post._id}`}>
                                            <MdEdit style={{ color: 'blue', fontSize: '20px' }} />
                                        </Link>
                                        <MdDeleteForever
                                            style={{ color: 'red', fontSize: '20px' }}
                                            onClick={() => handleDelete(post._id)}
                                        />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No blog posts available.</p>
                        )}
                    </div>
                    
                    <Outlet /> 
                </div>
            </BlogContext.Provider>
        </div>
    );
};

export default AdminPanel;
