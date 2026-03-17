import React from 'react'
import {useParams} from 'react-router'
import{useState,useEffect} from 'react'
import axios from 'axios'
import MarkdownEditor from '@uiw/react-markdown-editor';


function ReadMore() {
const[read,setRead]=useState();
  const {slug}=useParams();

  const readBlog=async()=>{
    const response= await axios.get(`${import.meta.env.VITE_API_URL}/blogs/${slug}`)
    setRead(response.data.data);
    console.log(response.data.data);

  }
  useEffect(()=>{
    readBlog();
  },[slug])
  return (
    <div>
     <h1 className="font-serif text-start">{read?.title}</h1>
     <h3 className="font-serif text-start">{read?.author.name}</h3>
     <h3 className="font-serif text-start">{read?.status}</h3>
      <h6 className="text-start">{new Date(read?.createdAt).toLocaleString()}</h6> 
      <MarkdownEditor.Markdown source={read?.content} className="font-serif text-start"/>
       </div>
  )
}

export default ReadMore