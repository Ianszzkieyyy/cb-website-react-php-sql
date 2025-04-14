import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Products from './pages/Products.jsx'
import ProductPage from './pages/ProductPage.jsx'

const router = createBrowserRouter([
  {path: "/", element: <App />},
  {path: "/products", element: <Products />},
  {path: "/product/:id", element: <ProductPage />}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
