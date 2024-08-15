import React from 'react'

import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'


function Layout() {
  return (
    <div className='bg-purple-200 '>
      {/* <Header/> */}
      <Outlet/>
      {/* <Footer/> */}
    </div>
  )
}

export default Layout
