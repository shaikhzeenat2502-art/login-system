import React, { useEffect, useState } from "react";
import axios from "axios";

function StoreDashboard() {
  const [stores, setStores] = useState([]);

  // Backend se data fetch karna
  useEffect(() => {
    axios.get("http://localhost:5000/stores")
      .then(res => setStores(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Store Dashboard</h1>
      <p>Welcome Store Owner! You are logged in successfully!</p>

      <h2>Stores List</h2>
      {stores.map((s, i) => (
        <div key={i}>
          <p>Name: {s.name}</p>
          <p>Email: {s.email}</p>
          <p>Address: {s.address}</p>
          <p>Rating: {s.rating}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default StoreDashboard;
