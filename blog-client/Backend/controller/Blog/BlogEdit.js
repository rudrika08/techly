const BlogModel = require("../../model/Blog/BlogModel");
const BlogUpdateController=async(req,res)=>{
    try{
        const blogId=req.body.id;
        const blogUpdate=req.body;
        const updatedBlog=await BlogModel.findByIdAndUpdate(blogId,blogUpdate);
        return res.status(200).json({
            message: "Blog updated successfully",
            success: true,
            data: updatedBlog,
        });
    }catch(error){
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}

module.exports=BlogUpdateController