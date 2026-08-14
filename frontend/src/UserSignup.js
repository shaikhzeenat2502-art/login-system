import React, { useState } from "react";
import axios from "axios";

function UserSignup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3000/auth/user-signup", form);
    alert("User Signup Successful!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>User Signup</h2>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Signup</button>
    </form>
  );
}

export default UserSignup;
