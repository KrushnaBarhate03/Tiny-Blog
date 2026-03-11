import React from 'react'
import {useState} from 'react'
 import axios from 'axios'
 import {Link} from 'react-router'

function Signup() {
  const[input,setInput]=useState({
    name:"",
    email:"",
    password:""
  })

  const SignUp= async()=>{
    const response= await axios.post("http://localhost:5002/signup",input);
    console.log("working ")
  }
  return (
   <div className="bg-blue-100 p-6 rounded-md border border-black w-64 mx-auto">
    <input type="text" placeholder="Enter your Name" className="bg-gray-200 p-2 border border-black rounded-md " value={input.name} onChange={(e)=>setInput({...input, name:e.target.value})}/>
    <br/>
    <br/>
    <input type="email" placeholder="Enter your Email" className="bg-gray-200 p-2 border border-black rounded-md " value={input.email} onChange={(e)=>setInput({...input,email:e.target.value})}/>
    <br/>
    <br/>
    <input type="password" placeholder="Enter your password" className="bg-gray-200 p-2 border border-black rounded-md " value={input.password} onChange={(e)=>setInput({...input,password:e.target.value})}/>

    <br/>
    <br/>
    
    <button type='button' className="p-2 font-serif bg-black text-white rounded-sm" onClick={SignUp}>Signup</button>

    <p className="text-sm font-[inter]">You already Have a Account {" "}
          <Link to="/login" className="text-blue-800 font-serif text-bold">login</Link>
        </p>
   </div>
  )
}

export default Signup