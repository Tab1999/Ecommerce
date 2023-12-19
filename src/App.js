import { Routes, Route, useNavigate, createSearchParams } from "react-router-dom"

import { NavBar } from "./components/navbar"
import { Products } from "./pages/products"
import { Product } from "./pages/product"
import { Cart } from "./pages/cart"
import { NotFound } from "./pages/not-found"
import RegisterAndLogin from "./login/RegisterAndLogin"
import { useCart } from './context/cart'
import ForgotPassword from "./login/ForgotPassword"

function App() {

  const navigate = useNavigate();
  const { cartItemCount } = useCart()

  const onSearch = (searchQuery) => {
    navigate(`/?${createSearchParams({ q: searchQuery })}`)
  }

  return (
    <>
      <NavBar onSearch={onSearch} cartItemCount={cartItemCount()} />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Products />} />
        <Route path="/login" element={<RegisterAndLogin/>} />
        <Route path="/reset" element={<ForgotPassword/>} />
      </Routes>
    </>
  );
}

export default App;
