import React, { useState } from "react";
import axios from "axios";

function AdminSignup() {
  const [form, setForm] = useState({ adminName: "", email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3000/auth/admin-signup", form);
    alert("Admin Signup Successful!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Admin Signup</h2>
      <input name="adminName" placeholder="Admin Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Signup</button>
    </form>
  );
}

export default AdminSignup;
