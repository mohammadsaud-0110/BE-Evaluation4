const mongoose=require("mongoose")
mongoose.set("strictQuery",false)

const postSchema=mongoose.Schema({
    title:String,
    body:String,
    device:String,
    no_if_comments:Number,
    user:String
},{
    versionKey:false
})

const PostModel=new mongoose.model("post",postSchema)


module.exports={
    PostModel
}