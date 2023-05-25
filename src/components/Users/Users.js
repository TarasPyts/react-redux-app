import React, { useState, useEffect } from 'react';
import './Users.css';
import { Link } from 'react-router-dom';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div className="users-container">
      <h2 className="users-title">Users</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>
                <Link to={`/posts?userId=${user.id}`}>
                  <button>Posts</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
