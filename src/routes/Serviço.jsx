import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./Routes.css"

export default function Servico(){

  const [services, setServices] = useState([])

  const url = 'http://localhost:3000/services'

  useEffect(() => {
    const getServicesList = async() => {
      const res = await fetch(url)
      const data = await res.json()
      setServices(data)
      console.log(data)
    }

    getServicesList()

  }, [])

  const deleteService = async (id) => {
    const res = await fetch(url + `/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      },
    })

    const deletedService = await res.json()
    setServices(services.filter(srv => srv.id !== deletedService.id))
  }

  return (
    <div>
      <button><Link to={`/cadastrar-servico`}>Cadastrar Serviço</Link></button>
      <h2>Cadastro de Serviços</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Lugar</th>
            <th>Data</th>
            <th>Valor</th>
            <th style={{ textAlign: "center" }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>{service.id}</td>
              <td>{service.place}</td>
              <td>{service.date}</td>
              <td>{service.value}</td>
              <td className="actions">
                <button><Link to={`/editar-servico/${service.id}`}>Editar</Link></button>
                <button onClick={() => deleteService(service.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
