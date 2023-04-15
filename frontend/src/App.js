import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import { CartProvider } from "./store/cart-context";
import { AuthProvider } from "./store/auth-context";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/login/Login";
import Register from "./pages/register/register";
import Verify from "./pages/register/verifyCode";

function App() {
  return (
    <AuthProvider>
      <a href="/">link text</a>
      <CartProvider>
        <BrowserRouter>
          <Navbar brand="iBookStore" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="verify" element={<Verify />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
