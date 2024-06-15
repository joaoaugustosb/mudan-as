import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./Routes.css"

export default function Usuario(){

  const [users, setUsers] = useState([])

  const url = 'http://localhost:3000/users'

  useEffect(() => {
    const getUsersList = async() => {
      const res = await fetch(url)
      const data = await res.json()
      setUsers(data)
      console.log(data)
    }

    getUsersList()

  }, [])

  const deleteUser = async (id) => {
    const res = await fetch(url + `/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      },
    })

    const deletedUser = await res.json()
    setUsers(users.filter(us => us.id !== deletedUser.id))
  }

  return (
    <div className="container">
      <button><Link to="/app/cadastrar-usuario" className="cadastrar-button">Cadastrar Usuário</Link></button>
      <h2 className="table-title">Cadastro de Usuários</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Idade</th>
            <th style={{ textAlign: "center" }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td className="actions">
                <button className="table-edit"><Link to={`/app/editar-usuario/${user.id}`} className="table-edit-link">Editar</Link></button>
                <button onClick={() => deleteUser(user.id)} className="table-delete">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
