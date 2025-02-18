# sprint 2, task 1

# BackendFrameworkSetup - Database and Project Documentation

## Overview
This project is a demonstration of setting up a backend development environment using the Spring Boot framework on a VM.

---

## Features
- **Backend Framework**: Spring Boot (Java)
- **API Endpoint**:
  - `GET /api/hello` returns the designated message
  - Configurable server port using the `application.properties` file

---

## Prerequisites
- Java 17 or higher
- Maven 3.6 or higher
- Text Editor/IDE (Nano, VS Code)

---

# sprint 2, task 2

### 1. PostgreSQL Setup with Docker

This project uses PostgreSQL as the database, running in a Docker container.


---

### 2. Environment Variables

Created a `.env` file in the project root to store database credentials:

```env
DB_NAME
DB_USER
DB_PASSWORD
DB_HOST
DB_PORT
```

! Ensure `.env` is added to `.gitignore` to prevent it from being committed to version control.

---

### 3. Database Connection

The database connection is managed in `config/db.js`:

```javascript
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: process.env.DB_PORT || 5432,
  logging: false,
});

module.exports = { sequelize };
```

---

### 4. Running Database Migrations

To create tables:
```sh
node migrations/migrate.js
```

---

### 5. Seeding the Database with Test Data

To populate the database with test data:
```sh
node seeds/seed.js
```

After running the seed script, to check if the data is inserted:
```sh
docker exec -it postgres-db psql -U your_user -d your_database
```
Then, run:
```sql
SELECT * FROM users;
SELECT * FROM departments;
SELECT * FROM department_managers;
```

---

### 6. Checking Tables in PostgreSQL

To verify that tables exist:
```sh
docker exec -it postgres-db psql -U your_user -d your_database
```
Inside PostgreSQL:
```sql
\dt
```

```
           List of relations
 Schema |         Name         | Type  | Owner 
--------+----------------------+-------+-------
 public | users               | table | user
 public | departments         | table | user
 public | department_managers | table | user
(3 rows)
```

---

### 7. Running the Backend Server

After setting up the database, to start the server:
```sh
node server.js
```

Expected output:
```
Database connected successfully.
Server running on http://localhost:5000
```

---

### 8. Database Schema

The project follows this relational database schema:

#### Users Table
- `id` (INT, Primary Key)
- `email` (VARCHAR, Unique)
- `department_id` (INT, Foreign Key to Departments)
- `name` (VARCHAR)

#### Departments Table
- `id` (INT, Primary Key)
- `name` (VARCHAR)
- `manager_id` (INT, Foreign Key to Users)

#### Department Managers Table
- `user_id` (INT, Foreign Key to Users)
- `department_name` (VARCHAR)
- `id` (INT, Primary Key)
- `name` (VARCHAR)
- `email` (VARCHAR, Unique)
- `department_id` (INT, Foreign Key to Departments)

---

### 9. Troubleshooting

#### Database connection error? 
Ensure PostgreSQL is running in Docker:
```sh
docker start postgres-db
```

#### Tables not found? 
Run migrations:
```sh
node migrations/migrate.js
```

#### Seed data missing? 
Run:
```sh
node seeds/seed.js
```

#### Check logs for errors:
```sh
docker logs postgres-db
```

# sprint 2, task 3

