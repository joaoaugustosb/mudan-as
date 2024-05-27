import{Link, NavLink} from 'react-router-dom'
import './NavBar.css'

export default function NavBar(){
    return(
        <div>
            <span style={{padding: '8px'}}><NavLink to={'/'} className={({isActive}) => (isActive ? 'active' : "")}>Home</NavLink></span>
            <span style={{padding: '8px'}}><NavLink to={'/products'} className={({isActive}) => (isActive ? 'active' : "")}>Produtos</NavLink></span>
        </div>
    )
}