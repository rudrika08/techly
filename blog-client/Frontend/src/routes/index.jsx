import { createBrowserRouter } from 'react-router-dom';
import App from './../App';
import BlogPage from './../pages/Blogpage/BlogPage';
import BlogForm from './../components/BlogForm/BlogForm';
import Login from './../Authentication/Login/Login';
import Signup from './../Authentication/Signup/Signup';
import AdminPanel from './../pages/AdminPanel/AdminDashboard/AdminDashboard';
import EditBlogPage from './../pages/AdminPanel/UpdateBlog/UpdateBlog';
import HomePage from './../pages/Home/Homepage';
import ProtectedRoute from './../helper/ProtectedRouter';

const router = createBrowserRouter([
    {
        path: '/',  // Home route, pointing to App component
        element: <App />,
        children: [
            {
                index: true,  // Default route
                element: <HomePage />, // Home page or blog listing
            },
            {
                path: '/blog',  // Blog page
                element: <BlogPage />,
            },
            {
                path: '/create-blog',  // Create blog page
                element: <BlogForm />,
            },
            {
                path: '/login',  // Login page
                element: <Login />,
            },
            {
                path: '/signup',  // Signup page
                element: <Signup />,
            },
            {
                path: '/user-details',  // Admin or user details page
                element: <AdminPanel />,
                children: [
                    {
                        path: 'edit/:id',  // Edit a specific blog post
                        element: <EditBlogPage />,
                    },
                ],
            },
        ],
    },
]);

export default router;
