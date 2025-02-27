import React from 'react';

const AdminDashboard = () => {
    return (
        <div>
            <h2>Admin Dashboard</h2>
            <button>
                <a href="http://localhost:5000/api-docs" target="_blank" rel="noopener noreferrer">
                    Go to Swagger API
                </a>
            </button>
        </div>
    );
};

export default AdminDashboard;