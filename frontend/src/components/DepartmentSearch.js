import React, { useState, useMemo } from "react";
import { useApiData } from "../services/api.service";

const DepartmentSearch = () => {
    const [departmentName, setDepartmentName] = useState("");

    // Fetch all users and departments
    const { data: users = [], error: userError, isLoading: userLoading } = useApiData({ endpoint: "users" });
    const { data: departments = [], error: deptError, isLoading: deptLoading } = useApiData({ endpoint: "departments" });

    // Map department names to IDs
    const departmentMap = useMemo(() => {
        const map = {};
        departments.forEach(dept => {
            map[dept.name.toLowerCase()] = dept.id; // Normalize for case-insensitive search
        });
        return map;
    }, [departments]);

    // Find department ID based on input
    const departmentId = departmentMap[departmentName.toLowerCase()];

    // Filter users by department ID
    const filteredUsers = departmentId ? users.filter(user => user.department_id === departmentId) : [];

    return (
        <div>
            <h2>Search Employees by Department</h2>

            {/* Search Input */}
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Enter department name..."
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
            />

            {/* Display Results */}
            {userLoading || deptLoading ? <p>Loading...</p> : null}
            {userError && <p className="text-danger">Error fetching users: {userError.message}</p>}
            {deptError && <p className="text-danger">Error fetching departments: {deptError.message}</p>}

            {departmentId && filteredUsers.length > 0 ? (
                <table className="table table-striped mt-3">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : departmentName && !departmentId ? (
                <p className="text-danger">No department found with that name.</p>
            ) : (
                <p className="text-muted">Enter a department name to see users.</p>
            )}
        </div>
    );
};

export default DepartmentSearch;
