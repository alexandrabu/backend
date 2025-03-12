import React, { createContext, useContext, useEffect, useState } from "react";
import { useKeycloak } from "@react-keycloak/web";

const AuthContext = createContext();

export const StateProvider = ({ children }) => {
    const { keycloak, initialized } = useKeycloak();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        if (initialized) {
            setIsAuthenticated(keycloak.authenticated);

            if (keycloak.authenticated) {
                keycloak.loadUserInfo().then((userInfo) => {
                    setUser(userInfo);
                    setRoles(keycloak.tokenParsed?.realm_access?.roles || []);
                });
            } else {
                keycloak.login(); // Redirect to Keycloak login
            }
        }
    }, [initialized, keycloak]);

    return (
        <AuthContext.Provider value={{ keycloak, isAuthenticated, user, roles }}>
            {initialized ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
};

export const useGlobalState = () => useContext(AuthContext);
