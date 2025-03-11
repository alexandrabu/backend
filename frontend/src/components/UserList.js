/* import React, { useEffect, useState } from 'react';
import apiService from '../services/api.service';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const response = await apiService.get('users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        loadUsers();
    }, []);

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserList; */
import React from 'react';
import { useApiData } from '../services/api.service';

const UserList = () => {
    const { data: users = [], error, isLoading } = useApiData({ endpoint: 'users' });


    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching users: {error.message}</div>;

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.length > 0 ? (
                    users.map((user) => <li key={user.id}>{user.name}</li>)
                ) : (
                    <p>No users found.</p>
                )}
            </ul>
        </div>
    );
};

export default UserList;
