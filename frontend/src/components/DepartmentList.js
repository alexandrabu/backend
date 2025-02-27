
import React, { useEffect, useState } from 'react';
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

export default DepartmentList;
