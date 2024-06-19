import React from "react"
import { Outlet, useLocation } from 'react-router-dom'
import NavBar from './components/navbar/NavBar.jsx'
import Footer from "./components/footer/Footer.jsx"
import "./App.css"

export default function App(){

  const location = useLocation()
  const isLoginPage = location.pathname === '/'

  return (
    <>
    <div>
      {!isLoginPage && <NavBar />}
      <Outlet />
      {!isLoginPage && <Footer />}
    </div>
    </>
  )
}
