import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import "./Form.css"

export default function ServiceForm(){ 

  const [place, setPlace] = useState("")
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
    setPlace(data.place)
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
      body: JSON.stringify({ place, date, value })
    }
    const save_url = edit ? url + `/${id}` : url
    try {
      const res = await fetch(save_url, saveRequestParams)
      if(res.status === 201 || res.status === 200) {
      navigate('/servicos')
    }
    } catch (error) {
      console.log(error.message)
      setError('Erro ao salvar o serviço')
    }
  }

  return (
    <div className="container">
      <h2>Cadastrar Serviço</h2>
      <form onSubmit={saveService}>
        <label htmlFor="place">Lugar:</label>
        <input type="text" name="place" value={place} onChange={(e) => setPlace(e.target.value)} required />
        <label htmlFor="date">Data:</label>
        <input type="number" name="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <label htmlFor="value">Valor:</label>
        <input type="number" name="value" value={value} onChange={(e) => setValue(e.target.value)} required />
        <input type="submit" value="Cadastrar" />
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}
