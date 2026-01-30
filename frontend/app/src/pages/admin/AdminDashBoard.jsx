import { useNavigate } from "react-router-dom";
import { FaUsers, FaCar, FaGavel, FaSignOutAlt } from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here
    navigate("/login");
  };

  const adminActions = [
    { title: "User Management", desc: "View and manage registered users", icon: <FaUsers />, path: "/admin-ui/users" },
    { title: "Vehicle Inventory", desc: "Approve or reject vehicle listings", icon: <FaCar />, path: "/admin-ui/vehicles" },
    { title: "Live Auctions", desc: "Monitor ongoing platform auctions", icon: <FaGavel />, path: "/user/auctions" },
  ];

  return (
    <div className="bg-light min-vh-100 p-4">
      <div className="container">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
          <h2 className="fw-bold">Admin Dashboard</h2>
          <button className="btn btn-danger d-flex align-items-center gap-2 shadow-sm" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>

        {/* Action Cards */}
        <div className="row g-4">
          {adminActions.map((action, index) => (
            <div className="col-md-4" key={index}>
              <div 
                className="card h-100 border-0 shadow-sm p-3 text-center text-md-start"
                style={{ cursor: "pointer", transition: "0.3s" }}
                onClick={() => navigate(action.path)}
              >
                <div className="fs-1 text-primary mb-3">{action.icon}</div>
                <h5 className="fw-bold">{action.title}</h5>
                <p className="text-muted small">{action.desc}</p>
                <button className="btn btn-outline-primary btn-sm mt-auto w-100">Manage</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;