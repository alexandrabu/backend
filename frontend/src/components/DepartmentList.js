
/* import React, { useEffect, useState } from 'react';
import ApiService from '../services/api.service';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        ApiService.get('departments')
            .then((response) => {
                setDepartments(response.data);
            })
            .catch((error) => {
                console.error('Error fetching departments:', error);
            });
    }, []);

    return (
        <div>
            <h2>Department List</h2>
            <ul>
                {departments.map((dept) => (
                    <li key={dept.id}>{dept.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default DepartmentList; */
import React from 'react';
import { useApiData } from '../services/api.service';

const DepartmentList = () => {

    const { data: departments, error, isLoading } = useApiData({ endpoint: 'departments' });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching departments: {error.message}</div>;

    return (
        <div>
            <h2>Department List</h2>
            <ul>
                {departments.map((dept) => (
                    <li key={dept.id}>{dept.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default DepartmentList;
