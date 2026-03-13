import React from 'react'
import {useState,useEffect} from 'react'
import {getUser} from '../util.js'
import axios from 'axios'
import Blogscards from '../components/Blogcards.jsx'

function Allblog() {
  const [user,setUser]=useState(null);
  const [blog,setBlog]=useState([]);

  const loadblogs=async()=>{
    const response= await axios.get(`${import.meta.env.VITE_API_URL}/blogs?author=${user?._id || ""}`);
    setBlog(response.data.data);
  }
     

  useEffect(()=>{
    setUser(getUser());   
  },[])

  useEffect(()=>{
    loadblogs();
  },[user])
 
  return (
    <div>
    
     
     {blog.map((cards,i)=>{
      const {title,content,category,author,createdAt,updatedAt,slug,status}=cards;
      return(
        <div key={i}>
      <Blogscards title={title}  category={category} author={author.name}createdAt={createdAt} updatedAt={updatedAt} slug={slug} status={status}/>
    </div>
      )
    
      
     })}
     </div>
   
  )
}

export default Allblog