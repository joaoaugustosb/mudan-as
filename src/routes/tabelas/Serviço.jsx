import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./Table.css"

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
    <div className="table-container">
      <button className="cadastrar-button"><Link to="/app/cadastrar-servico" className="cadastrar-button-link">Cadastrar Serviço</Link></button>
      <h2 className="table-title">Cadastro de Serviços</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo de Serviço</th>
            <th>Estado</th>
            <th>Cidade</th>
            <th>Data</th>
            <th>Valor (R$)</th>
            <th style={{ textAlign: "center" }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>{service.id}</td>
              <td>{service.type}</td>
              <td>{service.state}</td>
              <td>{service.city}</td>
              <td>{service.date}</td>
              <td>{service.value}</td>
              <td className="actions">
                <button className="table-edit"><Link to={`/app/editar-servico/${service.id}`} className="table-edit-link">Editar</Link></button>
                <button className="table-delete" onClick={() => deleteService(service.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
