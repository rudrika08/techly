const BlogModel = require("../../model/Blog/BlogModel");
const UserModel = require("../../model/User/UserModel");

const BlogCreateController = async (req, res) => {
  try {
    const userID = req.user._id;

    // Check if user exists
    const user = await UserModel.findById(userID);
    if (!user) {
      return res.status(404).json({
        message: "User  not found",
        success: false,
      });
    }

    // Validate required fields
    const { title, content, image, category } = req.body;
    if (!title || !content || !image) {
      return res.status(400).json({
        message: "Title, content, and image are required",
        success: false,
      });
    }

    // Ensure category is an array, default to ['All Categories'] if not provided
    const blogCategory = Array.isArray(category) && category.length > 0 ? category : ['All Categories'];

    const newBlog = {
      title,
      content,
      image,
      category: blogCategory,
      author: user.username,
      authorId: userID,
    };

    const createdBlog = await BlogModel.create(newBlog);

    return res.status(201).json({
      message: "Blog created successfully",
      success: true,
      data: createdBlog,
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message, 
    });
  }
};

module.exports = BlogCreateController;
