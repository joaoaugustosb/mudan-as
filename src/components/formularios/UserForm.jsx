import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import "./Form.css"

export default function UserForm(){ 

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [error, setError] = useState(null)
  const [edit, setEdit] = useState(false)
  const navigate = useNavigate()
  const {id} = useParams()

  useEffect(() => {
    console.log('id: ', id)
    if(id !== undefined && id !== null) {
      getUserById(id)
    }
  }, [])

  const url = 'http://localhost:3000/users'

  const getUserById = async (id) => {
    const res = await fetch(url + `/${id}`)
    const data = await res.json()
    setName(data.name)
    setEmail(data.email)
    setAddress(data.address)
    setAge(data.age)
    setGender(data.gender)
    setEdit(true)
  }

  const saveUser = async (e) => {
    e.preventDefault()
    const saveRequestParams = {
      method: edit ? "PUT" : "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ name, email, address, age, gender })
    }
    const save_url = edit ? url + `/${id}` : url
    try {
      const res = await fetch(save_url, saveRequestParams)
      if(res.status === 201 || res.status === 200) {
      navigate('/usuarios')
    }
    } catch (error) {
      console.log(error.message)
      setError('Erro ao salvar o usuário.')
    }
  }

  return (
    <div className="container">
      <h2>Cadastrar Usuário</h2>
      <form onSubmit={saveUser}>
        <label htmlFor="name">Nome:</label>
        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
        <label htmlFor="email">E-mail:</label>
        <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label htmlFor="address">Endereço:</label>
        <input type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
        <label htmlFor="age">Idade:</label>
        <input type="number" name="age" value={age} onChange={(e) => setAge(e.target.value)} required />
        <label htmlFor="gender">Sexo:</label>
        <input type="text" name="gender" value={gender} onChange={(e) => setGender(e.target.value)} required />
        <input type="submit" value="Cadastrar" />
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}
