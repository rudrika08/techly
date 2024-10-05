const BlogModel = require("./../../model/Blog/BlogModel");

const BlogFetchController = async (req, res) => {
    try {
        const blog = await BlogModel.find();
        if (!blog) {
            return res.status(404).json({
                message: "Blog not found",
                success: false,
            });
        }
        return res.status(200).json({
            message: "Blog fetched successfully",
            success: true,
            data: blog,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

module.exports = BlogFetchController