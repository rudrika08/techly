const BlogModel = require("../../model/Blog/BlogModel");
const UserModel = require("../../model/User/UserModel");

const BlogCreateController = async (req, res) => {
    try{
        const userID=req.user._id;
        const user=await UserModel.findById(userID);
        const blog=req.body;
        const newBlog={
            title:blog.title,
            content:blog.content,
            image:blog.image,
            author:user.username,
            authorId:userID
        }

        const createdBlog = await BlogModel.create(newBlog);
        return res.status(200).json({
            message: "Blog created successfully",
            success: true,
            data: createdBlog,
        });
    }catch(error){
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}

module.exports = BlogCreateController