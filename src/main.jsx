import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import App from './App.jsx'
import Products from './pages/Products.jsx'
import ProductPage from './pages/ProductPage.jsx'
import CartPage from './pages/CartPage.jsx'
import CheckoutPage from './pages/CheckoutPage'


import { CartProvider } from './components/context/CartContext.jsx'


const router = createBrowserRouter([
  {path: "/", element: <App />},
  {path: "/products", element: <Products />},
  {path: "/product/:id", element: <ProductPage />},
  {path: "/cart", element: <CartPage />},
  {path: "/checkout", element: <CheckoutPage />},
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router}/>
    </CartProvider>
  </StrictMode>,
)
