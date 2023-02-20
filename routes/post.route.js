const express=require("express")
const {PostModel}=require("../models/post.model")
const jwt=require("jsonwebtoken")

const postRouter=express.Router()

postRouter.get("/",async(req,res)=>{
    if(req.query.device){
        const data= await PostModel.find({device:req.query.device})
        res.send(data)
    }
    else{
        const data= await PostModel.find()
        res.send(data)
    }
    // res.send(req.query)
})
postRouter.get("/top",async(req,res)=>{
    let data=await PostModel.find({user:req.body.user});
    data.sort((a,b)=>{return b.no_if_comments - a.no_if_comments })
    res.send(data[0]);
})

postRouter.post("/create",async(req,res)=>{
    let payload=req.body;
        const post = new PostModel(payload);
        await post.save();
        res.send({"msg":"Post Created"}) 
})
postRouter.patch("/update/:id",async(req,res)=>{
    let ID=req.params.id;
    let payload=req.body
    await PostModel.findByIdAndUpdate({_id:ID}, payload)
    res.send({"msg":"Post Updated."})
})
postRouter.delete("/delete/:id",async(req,res)=>{
    let ID=req.params.id;
    await PostModel.findByIdAndDelete(ID);
    res.send({"msg":"Post Deleted!"})
})


module.exports={
    postRouter
}