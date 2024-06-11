import React from "react"
import { useOutletContext } from "react-router-dom"
import "./Usuario.css"

export default function Usuario(){
  const { form, handleChange, saveProduct } = useOutletContext()

  return (
    <div className="container">
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={saveProduct}>
        <label htmlFor="name">Nome:</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} required />
        <label htmlFor="price">Preço:</label>
        <input type="number" name="price" value={form.price} min={0} onChange={handleChange} required />
        <label htmlFor="stock">Estoque:</label>
        <input type="number" name="stock" value={form.stock} min={0} onChange={handleChange} required />
        <input type="submit" value="Cadastrar" />
      </form>
    </div>
  )
}
