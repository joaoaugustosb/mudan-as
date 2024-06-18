import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import "./Form.css"

export default function UserForm(){ 

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [age, setAge] = useState("")
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
    setUsername(data.username)
    setPassword(data.password)
    setName(data.name)
    setEmail(data.email)
    setAge(data.age)
    setEdit(true)
  }

  const saveUser = async (e) => {
    e.preventDefault()
    const saveRequestParams = {
      method: edit ? "PUT" : "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ username, password, name, email, age })
    }
    const save_url = edit ? url + `/${id}` : url
    try {
      const res = await fetch(save_url, saveRequestParams)
      if(res.status === 201 || res.status === 200) {
      navigate('/app/usuarios')
    }
    } catch (error) {
      console.log(error.message)
      setError('Erro ao salvar o usuário.')
    }
  }

  return (
    <div className="form-container">
      <h2 className="form-title">Cadastrar Usuário</h2>
      <form onSubmit={saveUser}>
        <label htmlFor="username">Usuário:</label>
        <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <label htmlFor="password">Senha:</label>
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <label htmlFor="name">Nome:</label>
        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
        <label htmlFor="email">E-mail:</label>
        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label htmlFor="age">Idade:</label>
        <input type="number" name="age" value={age} onChange={(e) => setAge(e.target.value)} required />
        <input type="submit" value="Cadastrar" />
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}
