import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import JWT from 'jsonwebtoken'
dotenv.config();
import { signup,login } from './controllers/User.js';
import {postblogs,getblogs,getblogbyslug,editblog,publishblog} from './controllers/Blog.js'

async function connect(){
const conn= await mongoose.connect(process.env.MONGODB_URI);
try{
        if(conn){
            console.log('MongoDB Connected successfully')
        }
    }
    catch(error){
        console.log('MongoDB connecntion error:',error)
    }

    
}
const app=express();
app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.json({
        success:true,
        message:" Server is running "
    })
})
const jwtcheck=(req,res,next)=>{
    req.user=null;
    const {authentication}=req.headers;
    if(!authentication){
        return res.json({
            success:false,
            message:"user is not authorize"
        })
    }

    
    try{
        const token=authentication.split(" ")[1];
        const decode=JWT.verify(token,process.env.JWT_secret);
        req.user=decode;
        next()
    }catch(e){
        return res.json({
            success:false,
            message:"Invalid jwt token"
        })
    }
   
}
app.post("/signup",signup);
app.post("/login",login);
app.post("/blogs",jwtcheck,postblogs);
app.get("/blogs",getblogs)
app.get("/blogs/:slug",getblogbyslug);
 app.put("/editblogs/:slug",jwtcheck,editblog);
 app.patch('/publishblog/:slug',jwtcheck,publishblog)
const PORT=5002;

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
    connect();
})