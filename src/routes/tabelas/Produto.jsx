import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./Table.css"

export default function Produto(){
  
  const [products, setProducts] = useState([])

  const url = 'http://localhost:3000/products'

  useEffect(() => {
    const getProductsList = async() => {
      const res = await fetch(url)
      const data = await res.json()
      setProducts(data)
      console.log(data)
    }

    getProductsList()

  }, [])

  const deleteProduct = async (id) => {
    const res = await fetch(url + `/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      },
    })

    const deletedProduct = await res.json()
    setProducts(products.filter(prod => prod.id !== deletedProduct.id))
  }

  return (
    <div className="table-container">
      <button className="cadastrar-button"><Link to="/app/cadastrar-produto" className="cadastrar-button-link">Cadastrar Veículo</Link></button>
      <h2 className="table-title">Cadastro de Veículos</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo de Veículo</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Ano</th>
            <th>Tabela Fipe (R$)</th>
            <th style={{ textAlign: "center" }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.type}</td>
              <td>{product.brand}</td>
              <td>{product.model}</td>
              <td>{product.year}</td>
              <td>{product.price}</td>
              <td className="actions">
                <button className="table-edit"><Link to={`/app/editar-produto/${product.id}`} className="table-edit-link">Editar</Link></button>
                <button className="table-delete" onClick={() => deleteProduct(product.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
