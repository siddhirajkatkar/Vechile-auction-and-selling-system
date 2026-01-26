import { useEffect, useState } from "react";
import { getAllUsers, makeAdmin } from "../../services/adminUserService";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const res = await getAllUsers();
    setUsers(res.data);
  };

  const promoteUser = async (id) => {
    await makeAdmin(id);
    loadUsers();
  };

  return (
    <div className="container mt-4">
      <h3>Manage Users</h3>

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
                {u.role !== "ROLE_ADMIN" && (
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => promoteUser(u.userId)}
                  >
                    Make Admin
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
