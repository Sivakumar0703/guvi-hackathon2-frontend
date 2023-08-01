import React from 'react'
import Footer from "../footer/footer";
import '../layout/layout.css'
import Navbar from '../navbar/Naviagtionbar'

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className='content-area'> {children}  </div>
      <Footer className='footer' />
    </div>
  )
}

export default Layout