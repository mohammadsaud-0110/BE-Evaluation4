const mongoose=require("mongoose")
mongoose.set("strictQuery",false)

const userSchema=mongoose.Schema({
    name:String,
    email:String,
    gender:String,
    password:String,
    age:Number,
    city:String
},{
    versionKey:false
})

const UserModel=new mongoose.model("user",userSchema)


module.exports={
    UserModel
}