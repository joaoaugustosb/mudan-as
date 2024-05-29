import React from 'react'
import { NavLink } from 'react-router-dom'
import "./NavBar.css"

export default function NavBar(){
  return (
    <div className="navbar">
      <span className="nav-item">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
          Home
        </NavLink>
      </span>
      <span className="nav-item">
        <NavLink to="/cadastrar" className={({ isActive }) => (isActive ? 'active' : '')}>
          Cadastrar
        </NavLink>
      </span>
    </div>
  )
}
