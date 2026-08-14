import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [counts, setCounts] = useState({ users: 0, stores: 0, ratings: 0 });
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [formUser, setFormUser] = useState({ name: "", email: "", address: "", role: "Normal User" });
  const [formStore, setFormStore] = useState({ name: "", email: "", address: "", rating: "" });

  // ✅ Load counts, users, stores on page load
  useEffect(() => {
    axios.get("http://localhost:5000/counts")
      .then(res => setCounts(res.data))
      .catch(err => console.error("Counts error:", err));

    axios.get("http://localhost:5000/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error("Users error:", err));

    axios.get("http://localhost:5000/stores")
      .then(res => setStores(res.data))
      .catch(err => console.error("Stores error:", err));
  }, []);

  // ✅ Handle User Form Submit
  const handleUserSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/users", formUser)
      .then(res => {
        alert(res.data.message);
        setUsers([...users, res.data.user]); // add new user to list
      })
      .catch(err => console.error("Add user error:", err));
  };

  // ✅ Handle Store Form Submit
  const handleStoreSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/stores", formStore)
      .then(res => {
        alert(res.data.message);
        setStores([...stores, res.data.store]); // add new store to list
      })
      .catch(err => console.error("Add store error:", err));
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome Admin! You are logged in successfully!</h1>

      <h2>📊 Stats</h2>
      <p>Total Users: {counts.users}</p>
      <p>Total Stores: {counts.stores}</p>
      <p>Total Ratings: {counts.ratings}</p>

      <h2>👥 Users</h2>
      <ul>
        {users.map((u, i) => (
          <li key={i}>{u.name} — {u.email} — {u.role}</li>
        ))}
      </ul>

      <h2>🏬 Stores</h2>
      <ul>
        {stores.map((s, i) => (
          <li key={i}>{s.name} — {s.email} — Rating: {s.rating}</li>
        ))}
      </ul>

      <h2>Add User</h2>
      <form onSubmit={handleUserSubmit}>
        <input type="text" placeholder="Name" onChange={e => setFormUser({ ...formUser, name: e.target.value })} />
        <input type="email" placeholder="Email" onChange={e => setFormUser({ ...formUser, email: e.target.value })} />
        <input type="text" placeholder="Address" onChange={e => setFormUser({ ...formUser, address: e.target.value })} />
        <select onChange={e => setFormUser({ ...formUser, role: e.target.value })}>
          <option>Normal User</option>
          <option>Admin</option>
          <option>Store Owner</option>
        </select>
        <button type="submit">Add User</button>
      </form>

      <h2>Add Store</h2>
      <form onSubmit={handleStoreSubmit}>
        <input type="text" placeholder="Name" onChange={e => setFormStore({ ...formStore, name: e.target.value })} />
        <input type="email" placeholder="Email" onChange={e => setFormStore({ ...formStore, email: e.target.value })} />
        <input type="text" placeholder="Address" onChange={e => setFormStore({ ...formStore, address: e.target.value })} />
        <input type="number" placeholder="Rating" onChange={e => setFormStore({ ...formStore, rating: e.target.value })} />
        <button type="submit">Add Store</button>
      </form>
    </div>
  );
}

export default AdminDashboard;
