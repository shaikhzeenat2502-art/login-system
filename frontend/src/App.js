import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import AdminDashboard from "./AdminDashboard";
import StoreDashboard from "./StoreDashboard";
import UserDashboard from "./UserDashboard";

function App() {
  return (
    <Router>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/register" style={{ marginRight: "10px" }}>Register</Link>
        <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
        <Link to="/admin-dashboard" style={{ marginRight: "10px" }}>Admin</Link>
        <Link to="/store-dashboard" style={{ marginRight: "10px" }}>Store Owner</Link>
        <Link to="/user-dashboard">User</Link>
      </nav>

      <Routes>
        {/* ✅ Default route */}
        <Route path="/" element={<Register />} />

        {/* ✅ Register & Login */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* ✅ Dashboards */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/store-dashboard" element={<StoreDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
