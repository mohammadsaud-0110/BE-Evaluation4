const express=require("express")
const {UserModel}=require("../models/user.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

const userRouter=express.Router()


userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city}=req.body;
    try {
        bcrypt.hash(password, 5, async(err, hash) => {
            if(err){
                res.send({"msg":"Something went wrong","Error":err})
            }
            else{
                const user=new UserModel({name,email,gender,password:hash,age,city})
                await user.save();
                res.send({"msg":"User Registered Successfully"})
            }
        });
    } catch (error) {
        res.send({"msg":"Something went wrong","Error":err})
    }
})


userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(password, user[0].password,(err,result)=>{
                if(result){
                    let token = jwt.sign({userID:user[0]._id},"masai");
                    res.send({"msg":"Login Successful","token":token})
                }
                else if(err){
                    res.send({"msg":"Wrong Password","Error":err})
                }
            })
        }else{
            res.send({"msg":"User Not Found"})
        }
    } catch (error) {
        res.send({"msg":"Something went wrong","Error":err})
    }
})


module.exports={
    userRouter
}