import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

export default function Login(){

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3000/users')
      if(!response.ok){
        throw new Error('Usuário ou senha incorretos.')
      }
      const users = await response.json()
      const user = users.find(user => user.username === username && user.password === password)
      if(user){
        navigate('/app/produtos')
      }else{
        setError('Usuário ou senha incorretos.')
      }
    }catch(error){
      console.error('Login error:', error)
      setError('Ocorreu um erro ao tentar fazer o login. Por favor, tente novamente mais tarde.')
    }
  }

  return (
    <div className="login-container">
      <h2 className="login-title">Fazer Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Usuário:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
        </div>
        <button type="submit" className='login-button'>Login</button>
      </form>
    </div>
  )
}