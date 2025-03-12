import React, { useState, useMemo } from "react";
import { useApiData } from "../services/api.service";

const ManagerList = () => {
    const { data: managers = [], error, isLoading } = useApiData({ endpoint: "managers" });

    const [searchTerm, setSearchTerm] = useState("");
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    // Filter managers based on search input
    const filteredManagers = useMemo(() => {
        return managers.filter((manager) =>
            manager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            manager.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [managers, searchTerm]);

    // Sort managers
    const sortedManagers = useMemo(() => {
        if (!sortColumn) return filteredManagers;
        return [...filteredManagers].sort((a, b) => {
            if (a[sortColumn] < b[sortColumn]) return sortOrder === "asc" ? -1 : 1;
            if (a[sortColumn] > b[sortColumn]) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });
    }, [filteredManagers, sortColumn, sortOrder]);

    // Paginate managers
    const totalPages = Math.ceil(sortedManagers.length / pageSize);
    const paginatedManagers = sortedManagers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handleSort = (columnKey) => {
        if (sortColumn === columnKey) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(columnKey);
            setSortOrder("asc");
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching managers: {error.message}</div>;

    return (
        <div>
            <h2>Manager List</h2>

            {/* Search Bar */}
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Table */}
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>
                            Name {sortColumn === "name" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                        </th>
                        <th onClick={() => handleSort("email")} style={{ cursor: "pointer" }}>
                            Email {sortColumn === "email" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedManagers.map((manager) => (
                        <tr key={manager.id}>
                            <td>{manager.name}</td>
                            <td>{manager.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="d-flex justify-content-between align-items-center">
                <button
                    className="btn btn-secondary"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                >
                    Previous
                </button>

                <span className="mx-2">
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    className="btn btn-secondary"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ManagerList;
