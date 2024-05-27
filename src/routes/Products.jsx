import {Link} from 'react-router-dom'

export default function Products(){
    
    const products = [
        {id: 1, name: 'Uva', price: 10},
        {id: 2, name: 'Melancia', price: 14},
        {id: 3, name: 'Mamão', price: 8}
    ]
    return(
        <div>
            <h3>Produtos</h3>
            {products.map((prod) => (
                <ul key={prod.id}>
                    <li>Nome: {prod.name}</li>
                    <li>Preço: R${prod.price}</li>
                    <li><Link to={`/products/${prod.id}/info`}>Mais informações</Link></li>
                    <li><hr /></li>
                </ul>
            ))}
       </div>
    )
}