import React, { useEffect, useState } from "react";
import axios from "axios";

function UserDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/users")
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="dashboard-container">
      <h1>User Dashboard</h1>
      <p>Welcome User! You are logged in successfully!</p>

      <h2>Users List</h2>
      {users.map((u, i) => (
        <div key={i}>
          <p>Name: {u.name}</p>
          <p>Email: {u.email}</p>
          <p>Address: {u.address}</p>
          <p>Role: {u.role}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default UserDashboard;
