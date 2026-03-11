import React from 'react'
import {useState,useEffect} from 'react'
import {getUser} from '../util.js'

function Allblog() {
  const [user,setUser]=useState(null);
  useEffect(()=>{
    setUser(getUser())
  },[])
  return (
    <div>
      <h1>Hello</h1>
     <h1>{user ? ` Hello ${user.name}`:"Welcome Guest"}</h1>
    </div>
  )
}

export default Allblog