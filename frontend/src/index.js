import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './keycloak';
import { StateProvider } from './context/StateProvider';
import QueryProvider from './context/QueryProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const keycloakInitConfig = {
  onLoad: 'login-required', // Forces login before showing the app
  checkLoginIframe: false,
  pkceMethod: 'S256',
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ReactKeycloakProvider authClient={keycloak} initOptions={keycloakInitConfig}>
    <StateProvider>
      <QueryProvider>
        <App />
      </QueryProvider>
    </StateProvider>
  </ReactKeycloakProvider>
);
