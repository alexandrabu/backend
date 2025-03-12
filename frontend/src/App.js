/*import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useGlobalState } from "./context/StateProvider";
import DataTable from "./components/DataTable";
import DepartmentList from "./components/DepartmentList";
import ManagerList from "./components/ManagerList";
import DepartmentSearch from "./components/DepartmentSearch";
import Home from "./components/Home";
import AdminDashboard from "./components/AdminDashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  const { state } = useGlobalState();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/combined-data")
      .then((response) => response.json())
      .then((departments) => {
        const users = departments.flatMap(department =>
          department.users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            department: department.name
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

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link className="nav-link" to="/users">Users</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/departments">Departments</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/managers">Managers</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/department-search">Department Search</Link></li>

              {state.roles.includes("admin") && (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="http://localhost:5000/api-docs/?iss=http%3A%2F%2Flocalhost%3A8080%2Frealms%2FMyAppRealm" target="_blank" rel="noopener noreferrer">
                      Admin Dashboard (Swagger API Docs)
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="http://localhost:8080/admin/master/console/#/MyAppRealm" target="_blank" rel="noopener noreferrer">
                      Keycloak Realm
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>


      <div className="container mt-4">
        {state.isAuthenticated ? (
          <h2>Welcome, {state.user?.preferred_username || "User"}</h2>
        ) : (
          <h2>Not Logged In</h2>
        )}

        {state.roles.includes("admin") ? (
          <p className="text-success">Role: Admin</p>
        ) : (
          <p className="text-primary">Role: Regular User</p>
        )}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<DataTable data={data} columns={columns} />} />
          <Route path="/departments" element={<DepartmentList />} />
          <Route path="/managers" element={<ManagerList />} />
          <Route path="/department-search" element={<DepartmentSearch />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; */
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useGlobalState } from "./context/StateProvider";
import PrivateRoute from "./components/PrivateRoute";
import DataTable from "./components/DataTable";
import DepartmentList from "./components/DepartmentList";
import ManagerList from "./components/ManagerList";
import DepartmentSearch from "./components/DepartmentSearch";
import Home from "./components/Home";
import AdminDashboard from "./components/AdminDashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  const { user, roles } = useGlobalState();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/combined-data") // 🔥 Hardcoded API URL
      .then((response) => response.json())
      .then((departments) => {
        if (!Array.isArray(departments)) {
          console.error("Invalid response from API:", departments);
          setData([]);
          return;
        }

        const users = departments.flatMap(department =>
          department.users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            department: department.name
          }))
        );
        setData(users);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setData([]);
      });
  }, []);

  return (
    <Router>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Home</Link>

          {/* Mobile Navbar Toggle */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Items */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link className="nav-link" to="/users">Users</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/departments">Departments</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/managers">Managers</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/department-search">Department Search</Link></li>

              {/* Admin-Only Links */}
              {roles.includes("admin") && (
                <>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="http://localhost:5000/api-docs" // 🔥 Hardcoded Swagger URL
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Admin Dashboard (Swagger API Docs)
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="http://localhost:8080/admin/master/console/#/MyAppRealm" // 🔥 Hardcoded Keycloak URL
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Keycloak Realm
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mt-4">
        <h2>Welcome, {user?.preferred_username || "User"}</h2>

        {roles.includes("admin") ? (
          <p className="text-success">Role: Admin</p>
        ) : (
          <p className="text-primary">Role: Regular User</p>
        )}

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <DataTable
                  data={data}
                  columns={[
                    { key: "name", label: "Name" },
                    { key: "email", label: "Email" },
                    { key: "department", label: "Department" }
                  ]}
                />
              </PrivateRoute>
            }
          />
          <Route path="/departments" element={<PrivateRoute><DepartmentList /></PrivateRoute>} />
          <Route path="/managers" element={<PrivateRoute><ManagerList /></PrivateRoute>} />
          <Route path="/department-search" element={<PrivateRoute><DepartmentSearch /></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
