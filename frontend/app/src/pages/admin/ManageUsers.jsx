import { useEffect, useState } from "react";
import { getAllUsers, makeAdmin } from "../../services/adminUserService";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await getAllUsers();
      // Ensure we handle different possible ID field names (id or userId)
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
      loadUsers(); // Refresh list
    } catch (err) {
      alert("Failed to promote user");
    }
  };

  // Helper: Checks if any role in the Set is ROLE_ADMIN
  const checkIsAdmin = (u) => {
    return u.roles && u.roles.some(r => r.roleName === "ROLE_ADMIN");
  };

  return (
    <div className="container mt-4">
      <h3>Manage Users</h3>
      {loading && <p className="text-muted">Loading...</p>}
      {!loading && error && <p className="text-danger">{error}</p>}

      {!loading && !error && (
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Email</th>
              <th>Roles</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => {
              // FIX: Ensure we extract the correct ID property
              const userId = u.userId || u.id; 
              
              return (
                <tr key={userId}>
                  <td>{u.email}</td>
                  <td>
                    {u.roles?.map(r => r.roleName.replace("ROLE_", "")).join(", ")}
                  </td>
                  <td>
                    {!checkIsAdmin(u) ? (
                      <button 
                        className="btn btn-sm btn-primary" 
                        onClick={() => promoteUser(userId)}
                      >
                        Make Admin
                      </button>
                    ) : (
                      <span className="text-success fw-bold">Admin</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageUsers;