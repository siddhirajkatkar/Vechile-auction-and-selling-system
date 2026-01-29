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
    try {
      await makeAdmin(id);
      loadUsers();
    } catch (err) {
      alert("Failed to promote user");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Manage Users</h3>

      {/* Loading state */}
      {loading && (
        <p className="text-muted mt-3">Loading users...</p>
      )}

      {/* Error state */}
      {!loading && error && (
        <p className="text-danger mt-3">{error}</p>
      )}

      {/* No users */}
      {!loading && !error && users.length === 0 && (
        <p className="text-muted mt-3">
          No users available to manage.
        </p>
      )}

      {/* Users table */}
      {!loading && !error && users.length > 0 && (
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.userId}>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  {u.role !== "ROLE_ADMIN" ? (
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => promoteUser(u.userId)}
                    >
                      Make Admin
                    </button>
                  ) : (
                    <span className="text-success">Admin</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageUsers;
