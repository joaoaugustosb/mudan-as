import React from "react";
import "./ComponenteTabela.css";

export default function ComponenteTabela({produtos, editar, deletar}) {
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
          {produtos.map((product, index) => (
            <tr key={index}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td className="actions">
                <button onClick={() => editar(product.id)}>Editar</button>
                <button onClick={() => deletar(product.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
