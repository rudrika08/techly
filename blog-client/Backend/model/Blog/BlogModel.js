const express=require('express');
const mongoose=require('mongoose');
const BlogSchema = new mongoose.Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    image:{type:String},
    author:{type:String,required:true},
    authorId:{type:String,required:true},
},{
    timestamps:true
})
module.exports=mongoose.model('Blog',BlogSchema);