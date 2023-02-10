import React from 'react'
import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'
const Layout = ({children}) => {
  
  return (
    <div className='layout'>
      <Head>
        <title>Iram Stores</title>
      </Head>
      <header>
        <Navbar/>
      </header>
      <div className="main-container">
       {children}
      </div>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default Layout
