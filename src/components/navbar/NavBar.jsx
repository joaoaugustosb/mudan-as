import React from 'react'
import { NavLink } from 'react-router-dom'
import "./NavBar.css"

export default function NavBar(){
  return (
    <div className="navbar">
      <span className="nav-item">
        <NavLink to="/app/produtos" className={({ isActive }) => (isActive ? 'active' : '')}>
          Produtos
        </NavLink>
      </span>
      <span className="nav-item">
        <NavLink to="/app/usuarios" className={({ isActive }) => (isActive ? 'active' : '')}>
          Usuários
        </NavLink>
      </span>
      <span className="nav-item">
        <NavLink to="/app/servicos" className={({ isActive }) => (isActive ? 'active' : '')}>
          Serviços
        </NavLink>
      </span>
    </div>
  )
}
