import React from 'react';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import keycloak from './keycloak';
import Home from './components/Home';
import AdminPage from './components/AdminPage';
import HelloWorld from './components/HelloWorld';
import ItemList from './components/ItemList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{ onLoad: 'login-required' }}
      onEvent={(event, error) => {
        if (event === 'onAuthSuccess') {
          console.log('User authenticated');
        }
        if (event === 'onAuthError') {
          console.error('Authentication Error:', error);
        }
      }}
    >
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route
            path="/hello-world"
            element={
              <div className="App">
                <HelloWorld />
                <ItemList />
              </div>
            }
          />
        </Routes>
      </Router>
    </ReactKeycloakProvider>
  );
};

export default App;

/*
import React from 'react';
import HelloWorld from './components/HelloWorld';
import ItemList from './components/ItemList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <ToastContainer />
      <div className="App">
        <HelloWorld />
        <ItemList />
      </div>
    </>
  );
}

export default App; */
