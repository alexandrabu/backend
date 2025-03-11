/* import React, { useEffect, useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { useGlobalState } from '../context/StateProvider';

const PrivateRoute = ({ children }) => {
    const { keycloak } = useKeycloak();
    const { dispatch } = useGlobalState(); // Removed 'state' to fix warning
    const [isInitializing, setIsInitializing] = useState(true);

    useEffect(() => {
        if (keycloak) {
            if (keycloak.authenticated) {
                dispatch({
                    type: 'LOGIN',
                    payload: { roles: keycloak.tokenParsed?.realm_access?.roles || [] },
                });
                setIsInitializing(false);
            } else if (!keycloak.authenticated && !isInitializing) {
                keycloak.login(); // Only call login if it's not already processing
            }
        }
    }, [keycloak, keycloak?.authenticated, dispatch, isInitializing]);

    if (!keycloak || isInitializing) {
        return <div>Loading...</div>;
    }

    return children;
};

export default PrivateRoute; */

import React, { useEffect, useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { useGlobalState } from '../context/StateProvider';

const PrivateRoute = ({ children }) => {
    const { keycloak } = useKeycloak();
    const { dispatch } = useGlobalState();
    const [isInitializing, setIsInitializing] = useState(true);

    useEffect(() => {
        if (keycloak.authenticated) {
            dispatch({
                type: 'LOGIN',
                payload: {
                    user: keycloak.tokenParsed,
                    roles: keycloak.tokenParsed?.realm_access?.roles || [],

                },
            });
            setIsInitializing(false);
        } else if (!keycloak.authenticated && !isInitializing) {
            keycloak.login();
        }
    }, [keycloak, keycloak?.authenticated, dispatch, isInitializing]);

    if (!keycloak || isInitializing) {
        return <div>Loading...</div>;
    }

    return children;
};

export default PrivateRoute;
