import React from 'react';
import { useKeycloak } from '@react-keycloak/web';

const Home = () => {
    const { keycloak } = useKeycloak();

    return (
        <div>
            <h1>Welcome, {keycloak.tokenParsed?.preferred_username}</h1>
            {keycloak.hasRealmRole('admin') && (
                <button>Admin Dashboard</button>
            )}
        </div>
    );
};

export default Home;
