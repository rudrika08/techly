import { createBrowserRouter } from 'react-router-dom';
import App from './../App';
import BlogPage from './../pages/Blogpage/BlogPage';
// import EditBlogPage from './../pages/EditBlog/EditBlog';
import BlogForm from './../components/BlogForm/BlogForm';
import Login from './../Authentication/Login/Login';
import Signup from './../Authentication/Signup/Signup';
import AdminPanel from './../pages/AdminPanel/AdminDashboard/AdminDashboard';
import EditBlogPage from './../pages/AdminPanel/UpdateBlog/UpdateBlog';
// import { ProtectedRoute } from './../helper/ProtectedRoute';
import ProtectedRoute from './../helper/ProtectedRouter';



const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <BlogPage />, // Default 
            },
            {
                path: '/blog',
                element: <BlogPage />,
            },
            {
                path: '/create-blog',
                element: <BlogForm />,
            },
            {
                path: '/login',
                element: <ProtectedRoute />, // Use ProtectedRoute component
            },
            {
                path: '/signup',
                element: <Signup />,
            },
            {
                path: '/user-details',
                element: <AdminPanel />,
                children: [
                    {
                        path: 'edit/:id',
                        element: <EditBlogPage />,
                    },
                ]
            }
        ],
    },
]);

export default router;


{/* <Routes>
        <Route path="/" element={<BlogPage />} />
        <Route path="/edit-blog/:id" element={<EditBlogPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create-blog" element={<BlogForm />} />

        
        <Route path="/user-details" element={<AdminPanel />} />
        <Route path="/user-details/edit/:id" element={<EditBlogPage />} /> 
      </Routes> */}