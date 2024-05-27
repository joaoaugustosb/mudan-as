import React from "react"
import "./ComponenteFormulario.css"

export default function ComponenteFormulario({nome, preco, estoque, handleName, handlePrice, handleStock, salvar}) {
    return (
        <>
        <div className="container">
            <h2>Cadastro de Produtos</h2>
            <form onSubmit={(e) => salvar(e)}>
                <label htmlFor="nome">Nome:</label>
                <input type="text" name="nome" value={nome} onChange={(e) => handleName(e)} required />
                <label htmlFor="preco">Preço:</label> 
                <input type="number" name="preco" value={preco} min={0} onChange={(e) => handlePrice(e)} required />
                <label htmlFor="estoque">Estoque:</label>
                <input type="number" name="estoque" value={estoque} min={0} onChange={(e) => handleStock(e)} required />
                <input type="submit" value="Cadastrar" />
            </form>
        </div>
        </>
    )
}
