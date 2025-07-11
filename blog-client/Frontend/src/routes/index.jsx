import { createBrowserRouter } from 'react-router-dom';
import App from './../App';
import BlogPage from './../pages/Blogpage/BlogPage';
import BlogCreate from '../components/BlogCreate/CreateBlog';
import Login from './../Authentication/Login/Login';
import Signup from './../Authentication/Signup/Signup';
import AdminPanel from './../pages/AdminPanel/AdminDashboard/AdminDashboard';
import EditBlogPage from './../pages/AdminPanel/UpdateBlog/UpdateBlog';
import HomePage from './../pages/Home/Homepage';
import BlogDetailPage from '../pages/BlogDetail/BlogDetail';    
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <HomePage /> },
            { path: '/blog', element: <BlogPage /> },
            { path: '/blogCreate', element: <BlogCreate /> },
            { path: '/blog/:id', element: <BlogDetailPage /> },
            { path: '/login', element: <Login /> },
            { path: '/signup', element: <Signup /> },
            {
                path: '/admin',
                element: <AdminPanel />,
                children: [
                    { path: 'edit/:id', element: <EditBlogPage /> },
                ],
            },
        ],
    },
]);

export default router;
