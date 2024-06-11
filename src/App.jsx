import React, { useEffect, useState } from "react"
import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from './components/navbar/NavBar.jsx'
import "./App.css"

export default function App(){
  const [products, setProducts] = useState([])
  const [id, setId] = useState("")
  const [edit, setEdit] = useState(false)
  const navigate = useNavigate()

  const clearForm = () => {
    setName("")
    setPrice("")
    setStock("")
  }

  const handleName = (e) => {setName(e.target.value)}
  const handlePrice = (e) => {setPrice(e.target.value)}
  const handleStock = (e) => {setStock(e.target.value)}

  return (
    <>
    <div>
      <NavBar />
      <Outlet />
    </div>
    </>
  )
}
