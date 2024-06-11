import React from "react"
import { Outlet } from 'react-router-dom'
import NavBar from './components/navbar/NavBar.jsx'
import "./App.css"

export default function App(){
  return (
    <>
    <div>
      <NavBar />
      <Outlet />
    </div>
    </>
  )
}
