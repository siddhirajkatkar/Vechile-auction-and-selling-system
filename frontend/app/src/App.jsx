import { Routes, Route } from "react-router-dom";

/* Public Pages */
import Home from "./pages/public/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

/* User Pages */
import UserDashboard from "./pages/user/UserDashBoard";

/* Admin Pages */
import AdminDashboard from "./pages/admin/AdminDashBoard";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageVehicles from "./pages/admin/ManageVechiles";
import ViewAuctions from "./pages/admin/ViewAuctions";

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* User */}
      <Route path="/user/dashboard" element={<UserDashboard />} />

      {/* Admin */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<ManageUsers />} />
      <Route path="/admin/vehicles" element={<ManageVehicles />} />
      <Route path="/admin/auctions" element={<ViewAuctions />} />
    </Routes>
  );
}

export default App;
