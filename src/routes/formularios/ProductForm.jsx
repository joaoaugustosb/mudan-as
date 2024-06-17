import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import "./Form.css"

export default function ProductForm(){ 

  const [type, setType] = useState("")
  const [brand, setBrand] = useState("")
  const [model, setModel] = useState("")
  const [year, setYear] = useState("")
  const [price, setPrice] = useState("")
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
    setType(data.type)
    setBrand(data.brand)
    setModel(data.model)
    setYear(data.year)
    setPrice(data.price)
    setEdit(true)
  }

  const saveProduct = async (e) => {
    e.preventDefault()
    const saveRequestParams = {
      method: edit ? "PUT" : "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ type, brand, model, year, price })
    }
    const save_url = edit ? url + `/${id}` : url
    try {
      const res = await fetch(save_url, saveRequestParams)
      if(res.status === 201 || res.status === 200) {
      navigate('/app/produtos')
    }
    } catch (error) {
      console.log(error.message)
      setError('Erro ao salvar o produto.')
    }
  }

  return (
    <div className="container">
      <h2 className="form-title">Cadastrar Veículo</h2>
      <form onSubmit={saveProduct}>
        <label htmlFor="type">Tipo de Veículo:</label>
        <select name="type" value={type} onChange={(e) => setType(e.target.value)} required>
          <option value="" hidden>Selecione</option>
          <option value="Carro">Carro</option>
          <option value="Moto">Moto</option>
        </select>
        <label htmlFor="brand">Marca:</label>
        <input type="text" name="brand" value={brand} onChange={(e) => setBrand(e.target.value)} required />
        <label htmlFor="model">Modelo:</label>
        <input type="text" name="model" value={model} onChange={(e) => setModel(e.target.value)} required />
        <label htmlFor="year">Ano:</label>
        <input type="number" name="year" value={year} onChange={(e) => setYear(e.target.value)} required />
        <label htmlFor="price">Tabela Fipe (R$):</label>
        <input type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input type="submit" value="Cadastrar" />
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}
