import React from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";

const App = () => {

  return (
    <div>
      <Navbar />
      {/* <HomePage/> */}
      <ProductsPage />
    </div>
    
  )
}

export default App