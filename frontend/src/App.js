import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useGlobalState } from "./context/StateProvider";
import PrivateRoute from "./components/PrivateRoute";
import DataTable from "./components/DataTable";
import DepartmentList from "./components/DepartmentList";
import ManagerList from "./components/ManagerList";
import Home from "./components/Home";
import AdminDashboard from "./components/AdminDashboard";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const { state } = useGlobalState();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/combined-data")
      .then((response) => response.json())
      .then((departments) => {
        // Flatten the users into a single array
        const users = departments.flatMap(department =>
          department.users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            department: department.name // Assign department name
          }))
        );
        setData(users);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  console.log("User Authentication State:", {
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    roles: state.roles,
  });

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "department", label: "Department" }
  ];

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Home</Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/users">Users</Link>
            <Link className="nav-link" to="/departments">Departments</Link>
            <Link className="nav-link" to="/managers">Managers</Link>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        {/* User Authentication Info */}
        {state.isAuthenticated ? (
          <h2>Welcome, {state.user?.preferred_username || "User"}</h2>
        ) : (
          <h2>Not Logged In</h2>
        )}

        {/* Show Role Information */}
        {state.roles.includes("admin") ? (
          <p className="text-success">Role: Admin</p>
        ) : (
          <p className="text-primary">Role: Regular User</p>
        )}

        {/* Admin Dashboard Button */}
        {state.roles.includes("admin") && (
          <a
            href="http://localhost:5000/api-docs"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-3"
          >
            Admin Dashboard
          </a>
        )}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<PrivateRoute><DataTable data={data} columns={columns} /></PrivateRoute>} />
          <Route path="/departments" element={<PrivateRoute><DepartmentList /></PrivateRoute>} />
          <Route path="/managers" element={<PrivateRoute><ManagerList /></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;