import { Routes, Route } from "react-router-dom";

/* ================= PUBLIC PAGES ================= */
import Home from "./pages/public/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

/* ================= USER PAGES ================= */
import UserDashboard from "./pages/user/UserDashBoard";
import Auctions from "./pages/user/Auctions";
import ViewAuction from "./pages/user/ViewAuction";
import MyBids from "./pages/user/MyBids";
import AddCar from "./pages/user/AddCar";
import SubscriptionPlans from "./pages/user/SubscriptionPlans";
import MySubscription from "./pages/user/MySubscription";
import MyCars from "./pages/user/MyCars";
import CarsForSale from "./pages/user/CarForSale";

/* ================= ADMIN PAGES (UI ROUTES) ================= */
import AdminDashboard from "./pages/admin/AdminDashBoard";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageVehicles from "./pages/admin/ManageVechiles";
import ViewAuctions from "./pages/admin/ViewAuctions";

import WonAuctions from "./pages/user/WonAuctions";
import AdminAuctions from "./pages/admin/AdminAuctions";
import Cart from "./pages/cart/Cart";
import PaymentPage from "./pages/payment/paymentPage";

function App() {
  return (
    <Routes>

      {/* ===== PUBLIC ===== */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ===== USER ===== */}
      <Route path="/user/dashboard" element={<UserDashboard />} />
      <Route path="/user/auctions" element={<Auctions />} />
      <Route path="/user/auction/:auctionId" element={<ViewAuction />} />
      <Route path="/user/bids" element={<MyBids />} />
      <Route path="/user/add-car" element={<AddCar />} />
      <Route path="/user/subscriptions" element={<SubscriptionPlans />} />
      <Route path="/user/my-subscription" element={<MySubscription />} />
      <Route path="/user/my-cars" element={<MyCars />} />
      <Route path="/user/car-for-sell" element={<CarsForSale />} />

      {/* Cart */}

      <Route path="/user/cart" element={<Cart/>}/>

      {/* Payment */}

      <Route path="/user/payment" element={<PaymentPage/>}/>

      {/* ===== ADMIN UI (IMPORTANT: NOT /admin/*) ===== */}
      <Route path="/admin-ui/dashboard" element={<AdminDashboard />} />
      <Route path="/admin-ui/users" element={<ManageUsers />} />
      <Route path="/admin-ui/vehicles" element={<ManageVehicles />} />
      <Route path="/admin-ui/auctions" element={<ViewAuctions />} />

      <Route path="/user/won-auctions" element={<WonAuctions />} />
      <Route path="/admin/auctions" element={<AdminAuctions />}/>


    </Routes>
  );
} 

export default App;
