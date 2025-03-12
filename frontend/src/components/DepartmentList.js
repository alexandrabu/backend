
/*import React from 'react';
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
*/

import React from "react";
import { useApiData } from "../services/api.service";

const DepartmentList = () => {
    const { data: departments, error, isLoading } = useApiData({ endpoint: "departments" });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching departments: {error.message}</div>;

    return (
        <div>
            <h2>Department List</h2>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Department Name</th>
                        <th>Manager ID</th>
                        <th>Manager Name</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map((dept) => (
                        <tr key={dept.id}>
                            <td>{dept.name}</td>
                            <td>{dept.manager_id || "N/A"}</td>
                            <td>{dept.manager ? dept.manager.name : "N/A"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DepartmentList;
