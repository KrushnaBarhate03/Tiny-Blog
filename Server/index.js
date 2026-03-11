import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();
import { signup,login } from './controllers/User.js';
import {postblogs,getblogs} from './controllers/Blog.js'

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

app.post("/signup",signup);
app.post("/login",login);
app.post("/blogs",postblogs);
app.get("/blogs",getblogs)
const PORT=5002;

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
    connect();
})