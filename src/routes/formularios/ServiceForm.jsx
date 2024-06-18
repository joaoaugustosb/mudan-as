import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import "./Form.css"

export default function ServiceForm(){ 

  const [type, setType] = useState("")
  const [state, setState] = useState("")
  const [city, setCity] = useState("")
  const [date, setDate] = useState("")
  const [value, setValue] = useState("")
  const [error, setError] = useState(null)
  const [edit, setEdit] = useState(false)
  const navigate = useNavigate()
  const {id} = useParams()

  useEffect(() => {
    console.log('id: ', id)
    if(id !== undefined && id !== null) {
      getServiceById(id)
    }
  }, [])

  const url = 'http://localhost:3000/services'

  const getServiceById = async (id) => {
    const res = await fetch(url + `/${id}`)
    const data = await res.json()
    setType(data.type)
    setState(data.state)
    setCity(data.city)
    setDate(data.date)
    setValue(data.value)
    setEdit(true)
  }

  const saveService = async (e) => {
    e.preventDefault()
    const saveRequestParams = {
      method: edit ? "PUT" : "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ type, state, city, date, value })
    }
    const save_url = edit ? url + `/${id}` : url
    try {
      const res = await fetch(save_url, saveRequestParams)
      if(res.status === 201 || res.status === 200) {
      navigate('/app/servicos')
    }
    } catch (error) {
      console.log(error.message)
      setError('Erro ao salvar o serviço')
    }
  }

  return (
    <div className="form-container">
      <h2 className="form-title">Cadastrar Serviço</h2>
      <form onSubmit={saveService}>
        <label htmlFor="type">Tipo de Serviço:</label>
        <select name="type" value={type} onChange={(e) => setType(e.target.value)} required>
          <option value="" hidden>Selecione</option>
          <option value="Aluguel">Aluguel</option>
          <option value="Venda">Venda</option>
        </select>
        <label htmlFor="state">Estado:</label>
        <select name="state" value={state} onChange={(e) => setState(e.target.value)} required>
          <option value="" hidden>Selecione</option>
          <option value="Paraná">Paraná</option>
          <option value="Santa Catarina">Santa Catarina</option>
          <option value="Rio Grande do Sul">Rio Grande do Sul</option>
        </select>
        <label htmlFor="city">Cidade:</label>
        <input type="text" name="city" value={city} onChange={(e) => setCity(e.target.value)} required />
        <label htmlFor="date">Data:</label>
        <input type="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <label htmlFor="value">Valor (R$):</label>
        <input type="number" name="value" value={value} onChange={(e) => setValue(e.target.value)} required />
        <input type="submit" value="Cadastrar" />
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}
