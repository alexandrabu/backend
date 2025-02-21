require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const session = require('express-session');
const { keycloak, memoryStore } = require('./config/keycloak');
const { connectDB } = require('./config/db');

// Import Routes
const userRoutes = require('./routes/userRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const managerRoutes = require('./routes/managerRoutes');

const app = express();

// Logging Middleware
app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    console.log("Headers:", req.headers);
    next();
});

// Session Middleware (Required for Keycloak)
app.use(session({
    secret: process.env.SESSION_SECRET || 'test_secret', // Fallback for tests
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));

// Keycloak Middleware
app.use(keycloak.middleware());

// CORS & JSON Middleware
app.use(cors());
app.use(bodyParser.json());

// Swagger API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Public Route (Accessible by anyone)
app.get('/api/public', (req, res) => {
    res.json({ message: 'This is a public route.' });
});

// Protected Routes (Require Authentication)
app.get('/api/protected', keycloak.protect(), (req, res) => {
    res.json({ message: 'This is a protected route' });
});

// Admin-Only Route
app.get('/api/admin', keycloak.protect('realm:admin'), (req, res) => {
    res.json({ message: 'Admin-only route' });
});

// Apply API Routes (No Global Keycloak Protection)
app.use('/api/users', userRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/managers', managerRoutes);

// Connect to Database
connectDB();

// Handle API Errors
app.use((err, req, res, next) => {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
});

// Handle 404 Errors (Route Not Found)
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Export the app for testing
module.exports = app;
