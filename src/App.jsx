import React, { useState } from "react"
import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from './components/navbar/NavBar.jsx'
import "./App.css"

export default function App(){
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({ id: 1, name: "", price: "", stock: "" })
  const [edit, setEdit] = useState(false)
  const navigate = useNavigate()

  const clearForm = () => {
    setForm({ id: form.id + 1, name: "", price: "", stock: "" })
  }

  const saveProduct = (e) => {
    e.preventDefault()
    if (!edit) {
      setProducts((prevProducts) => [...prevProducts, form])
    } else {
      setProducts(products.map((product) => (product.id === form.id ? form : product)))
      setEdit(false)
    }
    clearForm()
    navigate('/')
  }

  const deleteProduct = (id) => {
    setProducts(products.filter((prod) => prod.id !== id))
  }

  const editProduct = (id) => {
    const product = products.find((prod) => prod.id === id)
    setForm(product)
    setEdit(true)
    navigate('/cadastrar')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const contextValue = {
    products,
    form,
    saveProduct,
    deleteProduct,
    editProduct,
    handleChange,
  }

  return (
    <>
    <div>
      <NavBar />
      <Outlet context={contextValue} />
    </div>
    </>
  )
}
