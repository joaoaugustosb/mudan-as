import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./Tabela.css"

export default function Tabela(){
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
    <div>
      <button><Link></Link>Cadastrar Produto</button>
      <h2>Tabela de Produtos</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Preço (R$)</th>
            <th>Estoque (Kg)</th>
            <th style={{ textAlign: "center" }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td className="actions">
                <button><Link to={`/editar-produto/${product.id}`}>Editar</Link></button>
                <button onClick={() => deleteProduct(product.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
