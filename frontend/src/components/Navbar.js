
import React from 'react';
import { useKeycloak } from '@react-keycloak/web';

const Navbar = () => {
    const { keycloak } = useKeycloak();

    const isAdmin = keycloak.hasRealmRole('admin');

    return (
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                {isAdmin && <li><a href="/admin">Admin Panel</a></li>}
                {/* Othr */}
            </ul>
        </nav>
    );
};

export default Navbar;
