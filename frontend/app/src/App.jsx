import { Routes, Route } from "react-router-dom";

/* ================= PUBLIC PAGES ================= */
import Home from "./pages/public/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

/* ================= USER PAGES ================= */
import UserDashboard from "./pages/user/UserDashBoard";
import Auctions from "./pages/user/auctions";
import ViewAuction from "./pages/user/ViewAuction";
import MyBids from "./pages/user/MyBids";
import AddCar from "./pages/user/addCar";
import SubscriptionPlans from "./pages/user/SubscriptionPlans";
import MySubscription from "./pages/user/MySubscription";
import MyCars from "./pages/user/MyCars";
import CarsForSale from "./pages/user/CarForSale";
import MyOrdersPage from "./pages/order/MyOrdersPage";

/* ================= ADMIN PAGES (UI ROUTES) ================= */
import AdminDashboard from "./pages/admin/AdminDashBoard";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageVehicles from "./pages/admin/ManageVechiles";
import ViewAuctions from "./pages/admin/ViewAuctions";

import WonAuctions from "./pages/user/WonAuctions";
import AdminAuctions from "./pages/admin/AdminAuctions";
import Cart from "./pages/cart/Cart";
import PaymentPage from "./pages/payment/PaymentPage";
import Checkout from "./pages/user/Checkout";
import ResetPassword from "./pages/auth/ResetPasssword";

function App() {
  return (
    <Routes>

      {/* ===== PUBLIC ===== */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />

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
      <Route path="/user/my-orders" element={<MyOrdersPage />} />

      {/* ===== CART ===== */}
      <Route path="/user/cart" element={<Cart />} />

      {/* ===== PAYMENT FLOW (DO NOT REMOVE) ===== */}
      {/* Optional direct access (cart / testing) */}
      <Route path="/user/payment" element={<PaymentPage />} />

      {/* Auction-based checkout */}
      <Route path="/user/payment/:auctionId" element={<Checkout />} />

      {/* ===== WON AUCTIONS ===== */}
      <Route path="/user/won-auctions" element={<WonAuctions />} />

      {/* ===== ADMIN UI ===== */}
      <Route path="/admin-ui/dashboard" element={<AdminDashboard />} />
      <Route path="/admin-ui/users" element={<ManageUsers />} />
      <Route path="/admin-ui/vehicles" element={<ManageVehicles />} />
      <Route path="/admin-ui/auctions" element={<ViewAuctions />} />

      <Route path="/admin/auctions" element={<AdminAuctions />} />

    </Routes>
  );
}

export default App;
