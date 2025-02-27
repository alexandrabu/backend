import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import UserList from './components/UserList';
import DepartmentList from './components/DepartmentList';
import ManagerList from './components/ManagerList';
import Home from './components/Home';
import AdminDashboard from './components/AdminDashboard';

const PrivateRoute = ({ children }) => {
  const keycloakContext = useKeycloak();

  if (!keycloakContext) {
    return <div>Loading...</div>;
  }

  const { keycloak } = keycloakContext;

  if (!keycloak.authenticated) {
    keycloak.login();
    return <div>Redirecting...</div>;
  }

  return children;
};

function App() {
  const { keycloak } = useKeycloak();

  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/users">Users</Link></li>
          <li><Link to="/departments">Departments</Link></li>
          <li><Link to="/managers">Managers</Link></li>
        </ul>
      </nav>

      {keycloak && keycloak.authenticated && (
        <h2>Welcome, {keycloak.tokenParsed?.preferred_username}</h2>
      )}

      {keycloak && keycloak.tokenParsed && keycloak.tokenParsed.realm_access.roles.includes('admin') && (
        <button style={{ marginTop: '20px' }}>
          <a href="http://localhost:5000/api-docs" target="_blank" rel="noopener noreferrer">
            Admin Dashboard
          </a>
        </button>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={
          <PrivateRoute>
            <UserList />
          </PrivateRoute>
        } />
        <Route path="/departments" element={
          <PrivateRoute>
            <DepartmentList />
          </PrivateRoute>
        } />
        <Route path="/managers" element={
          <PrivateRoute>
            <ManagerList />
          </PrivateRoute>
        } />
        <Route path="/admin" element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
