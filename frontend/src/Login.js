import "./login.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import "./Form.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation logic
    if (!form.email || !form.password) {
      alert("Email and Password are required!");
      return;
    }
    if (form.password.length < 8) {
      alert("Password must be at least 8 characters!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/auth/login", form);

      // ✅ Redirect logic based on role
      if (res.data.role === "Admin") navigate("/admin-dashboard");
      else if (res.data.role === "Store") navigate("/store-dashboard");
      else navigate("/user-dashboard");
    } catch (err) {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
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
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
