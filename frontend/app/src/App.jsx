import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/LoginForm";
//import Register from "./components/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
