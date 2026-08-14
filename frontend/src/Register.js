import React, { useState } from "react";
import axios from "axios"; // ✅ axios import
import { useNavigate } from "react-router-dom"; // ✅ navigate import
import "./Register.css"; // ✅ Baby pink CSS

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Normal User",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation
    if (!form.name || !form.email || !form.password) {
      alert("All fields are required!");
      return;
    }
    if (form.password.length < 8) {
      alert("Password must be at least 8 characters!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/auth/register", form);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      alert("Error during registration!");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="Normal User">Normal User</option>
            <option value="Store Owner">Store Owner</option>
            <option value="Admin">Admin</option>
          </select>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
