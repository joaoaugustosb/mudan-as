import "./App.css"
import React, { useEffect, useState } from "react"
import ComponenteTabela from "./components/ComponenteTabela"
import ComponenteFormulario from "./components/ComponenteFormulario"
import{Outlet} from 'react-router-dom'
import NavBar from './components/NavBar'

export default function App() {

  const [products, setProducts] = useState([])
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [edit, setEdit] = useState(false)

  const url = 'http://localhost:3000/products'

  useEffect(() => {
    const getProductsList = async() => {
      const res = await fetch(url)
      const data = await res.json()
      setProducts(data)
    }
    getProductsList()
  }, [])

  const clearForm = () => {
    setName("")
    setPrice("")
    setStock("")
  }

  const getProductById = async(id) => {
    const res = await fetch(url + `/${id}`)
    const data = await res.json()

    setName(data[0].name)
    setPrice(data[0].price)
    setStock(data[0].stock)
    setId(data[0].id)
    setEdit(true)
  }

  const saveProduct = async(e) => {
    e.preventDefault()
    const saveRequestParams = {
      method: edit ? "PUT" : "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({name, price, stock})
    }

    const save_url = edit ? url + `/${id}` : url
    const res = await fetch(save_url, saveRequestParams)

    if(!edit) {
      const newProduct = await res.json()
      setProducts((prevProducts) => [...prevProducts, newProduct])
    }

    if(edit) {
      const editedProduct = await res.json()
      const editedProductIndex = products.findIndex(prod => prod.id === id)
      products[editedProductIndex] = editedProduct
      setProducts(products)
    }
    clearForm()
    setEdit(false)
  }

  const deleteProduct = async(id) => {
    const res = await fetch(url + `/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      },
    })

    const deletedProduct = await res.json()
    setProducts(products.filter(prod => prod.id !== deletedProduct.id))
  }

  const handleName = (e) => {setName(e.target.value)}
  const handlePrice = (e) => {setPrice(e.target.value)}
  const handleStock = (e) => {setStock(e.target.value)}

  return (
    <>
      <div>
        <ComponenteTabela produtos={products} editar={getProductById} deletar={deleteProduct} />
      </div>
      <div>
        <ComponenteFormulario nome={name} preco={price} estoque={stock} handleName={handleName} handlePrice={handlePrice} handleStock={handleStock} salvar={saveProduct} />
      </div>
      <NavBar />
      <Outlet />
      <p>Footer</p>
    </>
  )
}