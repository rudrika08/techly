const BlogModel = require("../../model/Blog/BlogModel");

const BlogDeleteController = async (req, res) => {
    try {
        const blogId = req.body.id; 
        if (!blogId) {
            return res.status(400).json({
                message: "Blog ID is required",
                success: false,
            });
        }

        // console.log(blogId);
        const deletedBlog = await BlogModel.findByIdAndDelete(blogId);

        if (!deletedBlog) {
            return res.status(404).json({
                message: "Blog not found",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Blog deleted successfully",
            success: true,
            data: deletedBlog,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

module.exports = BlogDeleteController;
