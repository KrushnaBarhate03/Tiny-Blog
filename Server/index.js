import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();

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
const PORT=5002;

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
    connect();
})