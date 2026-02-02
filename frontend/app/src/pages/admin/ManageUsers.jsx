import { useEffect, useState } from "react";
import { getAllUsers, makeAdmin } from "../../services/adminUserService";
import { useNavigate } from "react-router-dom";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const username = "Admin"; // replace with dynamic username if needed

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await getAllUsers();
      setUsers(res.data || []);
      setError("");
    } catch (err) {
      setError("Unable to load users. Backend not ready.");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const promoteUser = async (id) => {
    if (!id) return alert("Invalid User ID");
    try {
      await makeAdmin(id);
      loadUsers();
    } catch (err) {
      alert("Failed to promote user");
    }
  };

  const checkIsAdmin = (u) => {
    return u.roles && u.roles.some(r => r.roleName === "ROLE_ADMIN");
  };

  return (
    <div className="container mt-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-dark text-white rounded shadow-sm">
        <h4 className="mb-0">Manage Users</h4>
        <span className="badge bg-light text-dark px-3 py-2">
          Username: <strong>{username}</strong>
        </span>
      </div>

      {/* Back Button */}
      <div className="mb-3">
        <button
          className="btn btn-primary fw-semibold"
          onClick={() => navigate("/admin/dashboard")}
        >
          ← Back to Admin Dashboard
        </button>
      </div>

      {/* Loading / Error */}
      {loading && (
        <div className="text-center text-muted fw-semibold">
          Loading users...
        </div>
      )}

      {!loading && error && (
        <div className="alert alert-danger text-center fw-semibold">
          {error}
        </div>
      )}

      {/* Users Table */}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-hover table-bordered shadow-sm align-middle">
            <thead className="table-dark text-center">
              <tr>
                <th>Email</th>
                <th>Roles</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {users.map((u) => {
                const userId = u.userId || u.id;

                return (
                  <tr key={userId}>
                    <td>{u.email}</td>
                    <td>
                      {u.roles
                        ?.map(r => r.roleName.replace("ROLE_", ""))
                        .join(", ")}
                    </td>
                    <td>
                      {!checkIsAdmin(u) ? (
                        <button
                          className="btn btn-sm btn-success fw-semibold"
                          onClick={() => promoteUser(userId)}
                        >
                          Make Admin
                        </button>
                      ) : (
                        <span className="badge bg-success">
                          Admin
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};

export default ManageUsers;
