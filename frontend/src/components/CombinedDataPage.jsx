import React, { useEffect, useState } from "react";
import DataTable from "./DataTable";

const CombinedDataPage = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/combined-data")
            .then((res) => res.json())
            .then((json) => setData(json))
            .catch((err) => console.error("Error fetching data:", err));
    }, []);

    const columns = [
        { key: "name", label: "User Name" },
        { key: "email", label: "Email" },
        {
            key: "department",
            label: "Department",
            render: (row) => row.department?.name || "N/A",
        },
    ];

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Combined Data Table</h1>
            <DataTable data={data} columns={columns} />
        </div>
    );
};

export default CombinedDataPage;
