import React from "react"
import { Outlet, useLocation } from 'react-router-dom'
import NavBar from './components/navbar/NavBar.jsx'
import "./App.css"

export default function App(){

  const location = useLocation()
  const LoginPage = location.pathname === '/'

  return (
    <>
    <div>
      {!LoginPage && <NavBar />}
      <Outlet />
    </div>
    </>
  )
}
