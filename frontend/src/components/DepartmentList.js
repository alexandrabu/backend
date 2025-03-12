import React, { useEffect, useState } from "react";
import { useApiData } from "../services/api.service";

const DepartmentList = () => {
    const { data: departments, error: deptError, isLoading: deptLoading } = useApiData({ endpoint: "departments" });
    const { data: users, error: userError, isLoading: userLoading } = useApiData({ endpoint: "users" });

    const [managerMap, setManagerMap] = useState({});

    useEffect(() => {
        if (users) {
            // Create a mapping of user ID to user name
            const map = {};
            users.forEach(user => {
                map[user.id] = user.name;
            });
            setManagerMap(map);
        }
    }, [users]);

    if (deptLoading || userLoading) return <div>Loading...</div>;
    if (deptError) return <div>Error fetching departments: {deptError.message}</div>;
    if (userError) return <div>Error fetching users: {userError.message}</div>;

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
                            <td>{managerMap[dept.manager_id] || "N/A"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DepartmentList;
