import { Routes, Route } from "react-router-dom";

/* Public Pages */
import Home from "./pages/public/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

/* User Pages */
import UserDashboard from "./pages/user/UserDashBoard";
import Auctions from "./pages/user/Auctions";
import MyBids from "./pages/user/MyBids";
import AddCar from "./pages/user/addCar";
import SubscriptionPlans from "./pages/user/SubscriptionPlans";
import MySubscription from "./pages/user/MySubscription";
import MyCars from "./pages/user/MyCars";
import ViewAuction from "./pages/user/ViewAuction";

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
      <Route path="/user/auctions" element={<Auctions />} />
      <Route path="/user/auction/:auctionId" element={<ViewAuction />} />
      <Route path="/user/bids" element={<MyBids />} />
      <Route path="/user/add-car" element={<AddCar />} />
      <Route path="/user/subscriptions" element={<SubscriptionPlans />} />
      <Route path="/user/my-subscription" element={<MySubscription />} />
      <Route path="/user/my-cars" element={<MyCars />} />

      {/* Admin */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<ManageUsers />} />
      <Route path="/admin/vehicles" element={<ManageVehicles />} />
      <Route path="/admin/auctions" element={<ViewAuctions />} />

    </Routes>
  );
}

export default App;
