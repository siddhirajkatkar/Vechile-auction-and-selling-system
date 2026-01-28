import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/LoginForm";
import Register from "./components/RegistrationForm";
import AddCar from "./CarPages/AddCarForm";
import AddCarForm from "./CarPages/AddCarForm";
//import Register from "./components/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register/>}/>
      <Route path="/addcar" element={<AddCarForm/>}/>
    </Routes>
  );
}

export default App;
