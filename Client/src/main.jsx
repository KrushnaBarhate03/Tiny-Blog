import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter,Routes,Route} from 'react-router'
import Allblog from './views/Allblog.jsx'
import Editblog from './views/Editblog.jsx'
import Newblog from './views/Newblog.jsx'
import  Blog from './views/Blog.jsx'
import Login from './views/Login.jsx'
import Signup from './views/Signup.jsx'
 
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Allblog/>}/>
    <Route path='/edit/:id' element={<Editblog/>}/> 
    <Route path='/newblog' element={<Newblog/>}/>
    <Route path='/Blog/:slug' element={<Blog/>}/>
    <Route path='/Login' element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
     </Routes>

  </BrowserRouter>,
)
