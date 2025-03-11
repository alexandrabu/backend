import React from 'react';
import { useKeycloak } from '@react-keycloak/web';
import DataTable from '../components/DataTable';  // Import DataTable

const Home = () => {
    const { keycloak } = useKeycloak();

    return (
        <div className="p-4">
            {keycloak && keycloak.tokenParsed && keycloak.tokenParsed.realm_access.roles.includes('admin') && (
                <p style={{ color: 'green', marginTop: '10px' }}>
                    As an admin, you have access to the API documentation. Click the button below to check Swagger.
                </p>
            )}

            {/* Display the DataTable */}
            <h2 className="text-xl font-bold mb-4">Company Overview</h2>
            <DataTable />
        </div>
    );
};

export default Home;
