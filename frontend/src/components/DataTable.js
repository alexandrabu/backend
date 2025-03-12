/* import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";

const DataTable = ({ data, columns, pageSizeOptions = [5, 10, 20] }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(pageSizeOptions[0]);

    // Filter data based on search input (by name or ID)
    const filteredData = useMemo(() => {
        return data.filter((row) => {
            const matchesName = row.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesID = row.id.toString().includes(searchTerm);
            return matchesName || matchesID;
        });
    }, [data, searchTerm]);

    // Sort Data
    const sortedData = useMemo(() => {
        if (!sortColumn) return filteredData;
        return [...filteredData].sort((a, b) => {
            if (a[sortColumn] < b[sortColumn]) return sortOrder === "asc" ? -1 : 1;
            if (a[sortColumn] > b[sortColumn]) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });
    }, [filteredData, sortColumn, sortOrder]);

    // Paginate Data
    const totalPages = Math.ceil(sortedData.length / pageSize);
    const paginatedData = sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handleSort = (columnKey) => {
        if (sortColumn === columnKey) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(columnKey);
            setSortOrder("asc");
        }
    };

    return (
        <div>
           
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search by ID or Name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

      
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
   
                        <th onClick={() => handleSort("id")} style={{ cursor: "pointer" }}>
                            ID {sortColumn === "id" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                        </th>

                        {columns.map((col) => (
                            <th key={col.key} onClick={() => handleSort(col.key)} style={{ cursor: "pointer" }}>
                                {col.label} {sortColumn === col.key ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((row, index) => (
                        <tr key={index}>

                            <td>{row.id}</td>

                            {columns.map((col) => (
                                <td key={col.key}>
                                    {row[col.key] !== undefined ? row[col.key] : "N/A"}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

        
            <div className="d-flex justify-content-between align-items-center">
                <div>
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


                <div>
                    <label className="me-2">Rows per page:</label>
                    <select
                        className="form-select"
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                            setCurrentPage(1); // Reset to first page
                        }}
                    >
                        {pageSizeOptions.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

DataTable.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    pageSizeOptions: PropTypes.array,
};

export default DataTable; */

import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";

const DataTable = ({ data = [], columns = [], pageSizeOptions = [5, 10, 20] }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(pageSizeOptions[0]);

    // Ensure data is always an array
    if (!Array.isArray(data)) {
        console.error("Invalid data received by DataTable:", data);
    }

    // Default to an empty array if data is undefined
    const safeData = Array.isArray(data) ? data : [];

    // Filter data based on search input (by name or ID)
    const filteredData = useMemo(() => {
        return safeData.filter((row) => {
            const matchesName = row.name?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesID = row.id?.toString().includes(searchTerm);
            return matchesName || matchesID;
        });
    }, [safeData, searchTerm]);

    // Sort Data
    const sortedData = useMemo(() => {
        if (!sortColumn) return filteredData;
        return [...filteredData].sort((a, b) => {
            if (a[sortColumn] < b[sortColumn]) return sortOrder === "asc" ? -1 : 1;
            if (a[sortColumn] > b[sortColumn]) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });
    }, [filteredData, sortColumn, sortOrder]);

    // Paginate Data
    const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
    const paginatedData = useMemo(() => sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize), [sortedData, currentPage, pageSize]);

    const handleSort = (columnKey) => {
        if (sortColumn === columnKey) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(columnKey);
            setSortOrder("asc");
        }
    };

    return (
        <div>
            {/* Search Input */}
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search by ID or Name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Table */}
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th onClick={() => handleSort("id")} style={{ cursor: "pointer" }}>
                            ID {sortColumn === "id" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                        </th>

                        {columns.map((col) => (
                            <th key={col.key} onClick={() => handleSort(col.key)} style={{ cursor: "pointer" }}>
                                {col.label} {sortColumn === col.key ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length + 1}>No data available</td>
                        </tr>
                    ) : (
                        paginatedData.map((row) => (
                            <tr key={row.id}>
                                <td>{row.id}</td>
                                {columns.map((col) => (
                                    <td key={col.key}>{row[col.key] !== undefined ? row[col.key] : "N/A"}</td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="d-flex justify-content-between align-items-center">
                <div>
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

                <div>
                    <label className="me-2">Rows per page:</label>
                    <select
                        className="form-select"
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                    >
                        {pageSizeOptions.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

DataTable.propTypes = {
    data: PropTypes.array,
    columns: PropTypes.array,
    pageSizeOptions: PropTypes.array,
};

export default DataTable;
