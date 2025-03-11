# React Frontend Project

## Project Overview
This is a React frontend application created using **Create React App**. It serves as the frontend for a web application with the following features:
- Organized directory structure for scalability
- Linting and formatting with **ESLint** and **Prettier**
- Uses React Router for navigation
- Configured with Babel for modern JavaScript and JSX support

---

## Prerequisites
The following should be installed in the system:
- **Node.js** (version 18 or later)
- **npm** (Node Package Manager)

## The versions can be checked using:
node -v
npm -v

# State Management Overview
The application implements state management using React Context API for authentication state and React Query for API data caching. This ensures efficient state handling, role-based UI updates, and optimized API interactions.

## State Flow Breakdown

### 1. Authentication State Flow
- Managed by: StateProvider.js (React Context API)
- Data Stored in Global State:
  - isAuthenticated: true or false, based on Keycloak authentication
  - user: Stores user details from Keycloak (preferred_username, etc.)
  - roles: Stores Keycloak user roles (e.g., admin, user)
- How It Works:
  1. When the app starts, PrivateRoute.js checks if the user is authenticated via Keycloak.
  2. If authenticated, it dispatches a LOGIN action to store the user data and roles.
  3. The UI dynamically renders different components based on isAuthenticated and roles.
  4. If the user logs out, a LOGOUT action resets the global state.

### Code Example (StateProvider.js - Authentication State Management)
```javascript
const initialState = {
    isAuthenticated: false,
    user: null,
    roles: [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                isAuthenticated: true,
                user: action.payload.user,
                roles: action.payload.roles,
            };
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
};
```
### 2. API Data State Flow
- Managed by: useApiData.js (React Query)
- How It Works:
  1. A component calls useApiData("managers") to fetch data.
  2. React Query first checks if cached data is available.
  3. If cached, the UI is updated without making a new request.
  4. If not cached, it fetches data from http://localhost:5000/api/managers and stores it in cache.

### Code Example (useApiData.js - API State Management)
```javascript
import { useQuery } from '@tanstack/react-query';
import axios from './axiosConfig';

const fetchData = async ({ queryKey }) => {
    const [endpoint] = queryKey;
    const response = await axios.get(`/${endpoint}`);
    return response.data;
};

export const useApiData = ({ endpoint, options = {} }) => {
    return useQuery({
        queryKey: [endpoint],
        queryFn: fetchData,
        ...options,
    });
};
```
### 3. UI Integration with State
- React components dynamically render based on state.
- The UI updates when:
  - A user logs in (App.js updates "Welcome, username").
  - A user’s role changes (Admin Dashboard appears/disappears).
  - API data updates (Manager List refreshes only when necessary).

### Code Example (App.js - UI Reacting to State Changes)
```javascript
const { state } = useGlobalState();

return (
    <div>
        <h2>
            {state.isAuthenticated ? `Welcome, ${state.user?.preferred_username}` : "Not Logged In"}
        </h2>
        <p style={{ color: state.roles.includes('admin') ? 'green' : 'blue' }}>
            Role: {state.roles.includes('admin') ? "Admin" : "Regular User"}
        </p>

        {state.roles.includes('admin') && (
            <button>
                <a href="http://localhost:5000/api-docs" target="_blank">
                    Admin Dashboard
                </a>
            </button>
        )}
    </div>
);
```
## State Flow Diagram
```
User Logs In → Keycloak Authenticated → StateProvider Updates isAuthenticated
                        ↓
              Roles are Retrieved from Keycloak
                        ↓
   UI Updates Based on Authentication State & Roles
                        ↓
     Components Fetch API Data Using useApiData
                        ↓
      Data is Cached and UI Displays API Responses
```
## Summary of State Flow
| State Type          | Managed By                   | How It Works |
|---------------------|-----------------------------|--------------|
| Authentication      | StateProvider.js (React Context API) | Stores isAuthenticated, user, and roles globally. |
| API Data           | useApiData.js (React Query) | Caches API responses and updates UI efficiently. |
| UI Updates         | App.js, ManagerList.js, etc. | Dynamically renders components based on state. |

## Conclusion
The React Context API and React Query work together to efficiently manage authentication state and API data. This ensures:
- Seamless authentication state handling (login/logout updates UI dynamically).
- Optimized API calls with caching (reduces redundant requests).
- Role-based UI updates (Admin Dashboard button visibility).

