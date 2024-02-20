import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './Components/Auth/Login'
import Register from './Components/Auth/Register'


const App = () => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
              {/* <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={<Home/>}  / > */}
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
              </Routes>
     </BrowserRouter>
    </div>
  )
}

export default App