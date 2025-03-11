import React from 'react';
import { useApiData } from '../services/api.service';

const ManagerList = () => {
    const { data: managers = [], error, isLoading } = useApiData({ endpoint: 'managers' });


    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching managers: {error.message}</div>;

    return (
        <div>
            <h2>Manager List</h2>
            <ul>
                {managers.map((manager) => (
                    <li key={manager.id}>{manager.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ManagerList;
