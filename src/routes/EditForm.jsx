import {useParams, Link} from "react-router-dom"

export default function EditForm(){

    const {id} = useParams()

    return(
        <div>
            <p>Edição do Componente {id}</p>
            <button><Link to={'/products'}>Voltar</Link></button>
        </div>
    )
}