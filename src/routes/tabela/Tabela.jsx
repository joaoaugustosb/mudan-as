import React from "react"
import { useOutletContext } from "react-router-dom"
import "./Tabela.css"

export default function Tabela(){
  const { products, editProduct, deleteProduct } = useOutletContext()

  return (
    <div>
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
                <button onClick={() => editProduct(product.id)}>Editar</button>
                <button onClick={() => deleteProduct(product.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
