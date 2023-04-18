import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import { CartProvider } from "./store/cart-context";
import { AuthProvider } from "./store/auth-context";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/login/Login";
import Chat from "./pages/chat/chatroom";
import History from "./pages/history/history";
import Register from "./pages/register/register";
import Verify from "./pages/register/verifyCode";
import Select from "./pages/login/Select";
import TeacherHome from "./pages/home/TeacherHome";
import TakeRecord from "./pages/teacher_record/TakeRecord";
import ViewRecord from "./pages/teacher_record/ViewRecord";
import CheckRobot from "./pages/login/CheckRobot";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar brand="Meta Eduation" chatroom="Chatroom" />
          <Routes>
            <Route path="/" element={<Select />} />
            <Route path="/student" element={<Home />} />
            <Route path="/checkRobot" element={<CheckRobot />} />
            <Route path="/teacher" element={<TeacherHome />} />
            <Route path="/viewGrade" element={<ViewRecord />} />
            <Route path="/recordGrade" element={<TakeRecord />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/login" element={<Login />} />
            <Route path="/history" element={<History />} />
            <Route path="/register" element={<Register />} />
            <Route path="verify" element={<Verify />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
