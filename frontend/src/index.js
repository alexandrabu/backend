import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './keycloak';
import { StateProvider } from './context/StateProvider';
import QueryProvider from './context/QueryProvider';
import 'bootstrap/dist/css/bootstrap.min.css';


const keycloakInitConfig = {
  onLoad: 'check-sso',
  checkLoginIframe: false,
  pkceMethod: 'S256',
  enableLogging: true,
  persistLogin: true,
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
