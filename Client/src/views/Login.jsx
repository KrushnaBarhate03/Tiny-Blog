import React from 'react'
import {useState} from 'react'
 import axios from 'axios'
 import toast,{Toaster} from 'react-hot-toast'
 import {Link} from 'react-router'

 
 

function Login() {
  const[input,setInput]=useState({
    email:"",
    password:""
  })

  const Loginn= async()=>{
   try{
    const response= await axios.post(`${import.meta.env.VITE_API_URL}/login`,input);
    toast.success(response.data.message);

    console.log(response.data.data)

    if(response?.data?.success){
      localStorage.setItem('username',JSON.stringify(response.data.data));
       window.location.href='/'
    }
   

   }
   catch(e){
    toast.error(e.response.data.message)
   }
  
   
   
   
  }
  return (
   <div className="bg-blue-100 p-6 rounded-md border border-black w-64 mx-auto">
    
   
    <input type="email" placeholder="Enter your Email" className="bg-gray-200 p-2 border border-black rounded-md " value={input.email} onChange={(e)=>setInput({...input,email:e.target.value})}/>
    <br/>
    <br/>
    <input type="password" placeholder="Enter your password" className="bg-gray-200 p-2 border border-black rounded-md " value={input.password} onChange={(e)=>setInput({...input,password:e.target.value})}/>

    <br/>
    <br/>
    
    <button type='button' className="p-2 font-serif bg-black text-white rounded-sm" onClick={Loginn}>Login</button>

    <p className="text-sm font-[inter]">You Don't Have an Account {" "}
      <Link to="/signup" className="text-blue-800 font-serif text-bold">Signup</Link>
    </p>

    <Toaster/>
   </div>
  )
}

export default Login