const express=require("express")
const cors=require("cors")
const {connection}=require("./mongoose")
const { userRouter }=require("./routes/user.route")
const {authenticate}=require("./middleware/authenticate.middleware")
const {postRouter}=require("./routes/post.route")

require("dotenv").config();

const app=express()
app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send({"msg":"Home Page LinkedIn"})
})
app.use("/users",userRouter)
app.use(authenticate)
app.use("/posts",postRouter)


app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("Connected to DB")
        console.log("Server port :",process.env.port)
    } catch (error) {
        console.log("Cannot connect to DB \n",error)
    }
})