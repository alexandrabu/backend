// src/components/ManagerList.js
import React, { useEffect, useState } from 'react';
import ApiService from '../services/api.service';

const ManagerList = () => {
    const [managers, setManagers] = useState([]);

    useEffect(() => {
        ApiService.get('managers')
            .then((response) => {
                setManagers(response.data);
            })
            .catch((error) => {
                console.error('Error fetching managers:', error);
            });
    }, []);

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
