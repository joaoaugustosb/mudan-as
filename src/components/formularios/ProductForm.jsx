import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import "./Form.css"

export default function ProductForm(){ 

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [error, setError] = useState(null)
  const [edit, setEdit] = useState(false)
  const navigate = useNavigate()
  const {id} = useParams()

  useEffect(() => {
    console.log('id: ', id)
    if(id !== undefined && id !== null) {
      getProductById(id)
    }
  }, [])

  const url = 'http://localhost:3000/products'

  const getProductById = async (id) => {
    const res = await fetch(url + `/${id}`)
    const data = await res.json()
    setName(data.name)
    setPrice(data.price)
    setStock(data.stock)
    setEdit(true)
  }

  const saveProduct = async (e) => {
    e.preventDefault()
    const saveRequestParams = {
      method: edit ? "PUT" : "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ name, price, stock })
    }
    const save_url = edit ? url + `/${id}` : url
    try {
      const res = await fetch(save_url, saveRequestParams)
      if(res.status === 201 || res.status === 200) {
      navigate('/produtos')
    }
    } catch (error) {
      console.log(error.message)
      setError('Erro ao salvar o produto.')
    }
  }

  return (
    <div className="container">
      <h2>Cadastrar Produto</h2>
      <form onSubmit={saveProduct}>
        <label htmlFor="name">Nome:</label>
        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
        <label htmlFor="price">Preço:</label>
        <input type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <label htmlFor="stock">Estoque:</label>
        <input type="number" name="stock" value={stock} onChange={(e) => setStock(e.target.value)} required />
        <input type="submit" value="Cadastrar" />
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}
