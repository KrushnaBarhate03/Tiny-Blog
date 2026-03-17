import React from 'react'
import {Link} from 'react-router'
import Readmore from './ReadMore.jsx'

function Blogcards({title,category,author,createdAt,updatedAt ,slug,status}) {
  console.log(title,status);
  return (
    <div className="bg-gray-300 mb-4 mt-4 rounded-md relative p-2">
        
      <h3 className="font-serif text-xl text-start ml-2">{title}</h3>
     <div className="absolute top-0 right-28">
      {status!="published" ?(<p className="font-serif text-md bg-red-500 p-1 rounded-md inline text-white">{status}</p>):(<p className="font-serif text-md bg-red-500 p-1 rounded-md inline text-white">{status}</p>)}
      </div>

      <p className="font-serif absolute right-0 text-white top-0 bg-orange-500 p-1 rounded-sm">{category}</p>
      <p className="font-serif text-xl font-semibold text-start ml-2">{author}</p>
      <p className='font-["inter"] text-start ml-2'>{new Date(createdAt).toLocaleString()}</p>
      <p className="font-['inter'] text-start ml-2">{new Date(updatedAt).toLocaleString()}</p>
      

    {status!="published" ?( <Link to={`/edit/${slug}`}>
      <button type="button" className="font-serif  bg-blue-500 p-1 rounded-md block mt-2 text-white text-xl  ">Edit </button></Link>):(<Link to={`/read/${slug}`}>
      <button type="button" className="font-serif  bg-blue-500 p-1 rounded-md block mt-2 text-white text-xl  ">Read more</button></Link>)
}
      
      
    </div>
  )
}

export default Blogcards