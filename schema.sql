CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    manager_id INT
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

ALTER TABLE departments ADD CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES users(id) ON DELETE SET NULL;

CREATE VIEW department_managers AS
SELECT 
    u.id AS user_id,
    d.name AS department_name,
    u.name AS name,
    u.email AS email,
    d.id AS department_id
FROM users u
JOIN departments d ON u.department_id = d.id
WHERE d.manager_id = u.id;
