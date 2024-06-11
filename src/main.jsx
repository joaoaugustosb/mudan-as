import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Produto from './routes/Produto.jsx'
import ProductForm from './components/formularios/ProductForm.jsx'
import Usuario from './routes/Usuário.jsx'
import UserForm from './components/formularios/UserForm.jsx'
import Servico from './routes/Serviço.jsx'
import ServiceForm from './components/formularios/ServiceForm.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/produtos',
        element: <Produto />
      },
      {
        path: '/cadastrar-produto',
        element: <ProductForm/>
      },
      {
        path: '/editar-produto/:id',
        element: <ProductForm />
      },
      {
        path: '/usuarios',
        element: <Usuario />
      },
      {
        path: '/cadastrar-usuario',
        element: <UserForm />
      },
      {
        path: '/editar-usuario/:id',
        element: <UserForm />
      },
      {
        path: '/servicos',
        element: <Servico />
      },
      {
        path: '/cadastrar-servico',
        element: <ServiceForm />
      },
      {
        path: '/editar-servico/:id',
        element: <ServiceForm />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
