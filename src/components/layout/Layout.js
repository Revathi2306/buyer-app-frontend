import React from 'react'
import Header from './Navbar'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <>
    <Header></Header>
    <main style={{minHeight: "80vh"}}>{children}</main>
    <Footer></Footer>
    </>
  )
}

export default Layout