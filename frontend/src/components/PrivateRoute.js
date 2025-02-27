import React from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const keycloakContext = useKeycloak();

    if (!keycloakContext || !keycloakContext.keycloak) {
        return <div>Loading...</div>;
    }

    const { keycloak } = keycloakContext;

    if (!keycloak.authenticated) {
        keycloak.login();
        return <div>Redirecting...</div>;
    }

    return children;
};


export default PrivateRoute;