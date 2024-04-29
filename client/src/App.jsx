import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Components/Auth/Login'
import Register from './Components/Auth/Register'
import Home from './Components/Landing_Page/Home'
import Layout from './Components/Landing_Page/Layout'
import About from './Components/Landing_Page/About'
import Chatroom from './Components/Dashboard/Chatroom'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
           
            <Route path='/' element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/chatroom' element={<Chatroom/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App