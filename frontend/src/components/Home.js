import React from 'react';
import { useKeycloak } from '@react-keycloak/web';

const Home = () => {
    const { keycloak } = useKeycloak();

    return (
        <div>

            {keycloak && keycloak.tokenParsed && keycloak.tokenParsed.realm_access.roles.includes('admin') && (
                <p style={{ color: 'green', marginTop: '10px' }}>
                    As an admin, you have access to the API documentation. Click the button below to check Swagger.
                </p>
            )}

        </div>
    );
};

export default Home;
