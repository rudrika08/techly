const UserModel = require("../../model/User/UserModel");
const BlogModel = require("../../model/Blog/BlogModel");

const BlogFetchByIdController = async (req, res) => {
    try{
        const userId=req.user._id;
        const blogFind=await BlogModel.find({authorId:userId});
        return res.status(200).json({
            message: "Blog fetched successfully",
            success: true,
            data: blogFind,
        });
    }catch(error){
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}

module.exports = BlogFetchByIdController