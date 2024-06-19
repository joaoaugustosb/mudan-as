import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Produto from './routes/tabelas/Produto.jsx'
import ProductForm from './routes/formularios/ProductForm.jsx'
import Usuario from './routes/tabelas/Usuário.jsx'
import UserForm from './routes/formularios/UserForm.jsx'
import Servico from './routes/tabelas/Serviço.jsx'
import ServiceForm from './routes/formularios/ServiceForm.jsx'
import Login from './components/login/Login.jsx'
import ErrorPage from './routes/ErrorPage.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <ErrorPage />
  },
  {
    path: '/app',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/app/produtos',
        element: <Produto />
      },
      {
        path: '/app/cadastrar-produto',
        element: <ProductForm/>
      },
      {
        path: '/app/editar-produto/:id',
        element: <ProductForm />
      },
      {
        path: '/app/usuarios',
        element: <Usuario />
      },
      {
        path: '/app/cadastrar-usuario',
        element: <UserForm />
      },
      {
        path: '/app/editar-usuario/:id',
        element: <UserForm />
      },
      {
        path: '/app/servicos',
        element: <Servico />
      },
      {
        path: '/app/cadastrar-servico',
        element: <ServiceForm />
      },
      {
        path: '/app/editar-servico/:id',
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
