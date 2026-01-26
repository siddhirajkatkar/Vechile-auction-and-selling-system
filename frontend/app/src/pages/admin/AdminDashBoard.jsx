import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>

      <div className="card p-3 mb-3">
        <h5>Manage Users</h5>
        <p>View and manage registered users</p>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/admin/users")}
        >
          Manage
        </button>
      </div>

      <div className="card p-3 mb-3">
        <h5>Manage Vehicles</h5>
        <p>Approve or reject vehicle listings</p>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/admin/vehicles")}
        >
          Manage
        </button>
      </div>

      <div className="card p-3 mb-3">
        <h5>View Auctions</h5>
        <p>Monitor ongoing auctions</p>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/admin/auctions")}
        >
          View
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
