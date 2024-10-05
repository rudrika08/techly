const BlogModel = require("../../model/Blog/BlogModel");
const blogFetchByBlogIdController = async (req, res) => {
    try{
        const blogId = req.body.id;

        // console.log(blogId);

        if (!blogId) {
            return res.status(400).json({
                message: "Blog ID is required",
                success: false,
            });
        }

        const blog = await BlogModel.findById(blogId);
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
    }catch(error){
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}

module.exports = blogFetchByBlogIdController