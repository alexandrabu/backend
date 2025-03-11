import React, { createContext, useReducer, useContext } from 'react';
import keycloak from '../keycloak';

const initialState = {
    isAuthenticated: !!keycloak.authenticated,
    user: null,
    roles: [],
    department: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                roles: action.payload.roles,

            };
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
};

const StateContext = createContext();

export const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <StateContext.Provider value={{ state, dispatch }}>
            {children}
        </StateContext.Provider>
    );
};

export const useGlobalState = () => useContext(StateContext);
