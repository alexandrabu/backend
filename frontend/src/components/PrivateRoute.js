import React from "react";
import { Navigate } from "react-router-dom";
import { useGlobalState } from "../context/StateProvider";

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useGlobalState();

    return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
