import React from "react";
import PropTypes from "prop-types";

const DataTable = ({ data, columns }) => {
    if (!data || !Array.isArray(data) || data.length === 0) {
        return <p>No data available.</p>;
    }

    return (
        <table className="table table-striped table-bordered">
            <thead>
                <tr>
                    {columns.map((col) => (
                        <th key={col.key}>{col.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        {columns.map((col) => (
                            <td key={col.key}>
                                {row[col.key] !== undefined ? row[col.key] : "N/A"}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

DataTable.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
};

export default DataTable;
