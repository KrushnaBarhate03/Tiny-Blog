import React from 'react'
import MarkdownEditor from '@uiw/react-markdown-editor';
import {useState,useEffect} from 'react'
import { BLOG_Category } from './constant';
import {getUser} from '../util.js'
import toast,{Toaster} from 'react-hot-toast'
import axios from 'axios'


function Newblog() {
  const [content,setContent]=useState(" ");
  const [input ,setInput]=useState(" ");
  const [category,setCategory]=useState(BLOG_Category[0]);
   const [user,setUser]=useState(null);
  

    useEffect(()=>{
      setUser(getUser())
    },[])

  const saveblog=async()=>{
    const response=await axios.post(`${import.meta.env.VITE_API_URL}/blogs`,{
      title:input,
      category,
      content,
      author:user?._id
    })

    if(response?.data?.success){
      toast.success("Blog saved successfully");
      setTimeout(()=>{
      window.location.href="/"
    },3000)
    }
    
  }
  

 
  return (
    <div>
      
 <input type="text" placeholder="Enter Title" className="rounded-md border border-black p-2 w-full mb-2" value={input} onChange={(e)=>setInput(e.target.value)}/>
  
<div className="flex flex-row justify-start items-start">
  <select className='rounded-md border border-black p-1 mb-2' onChange={(e)=>setCategory(e.target.value)}>{BLOG_Category.map((cate)=>{
    return <option key={cate} value={cate}>{cate} </option>
  })}</select>
  </div>

     <MarkdownEditor
      value={content}
      height="500px"
      onChange={(value, viewUpdate) => {
        setContent(value)

      }}/>
     <button type="button" className="text-white bg-blue-500 p-2 rounded-md font-serif mt-2" onClick={saveblog}>Save Blog</button>
     
     <Toaster/>
    </div>
   
  )
}

export default Newblog