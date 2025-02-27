require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const session = require('express-session');
const {
  keycloak,
  memoryStore
} = require('./config/keycloak');
const {
  connectDB
} = require('./config/db');

// Import Routes
const userRoutes = require('./routes/userRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const managerRoutes = require('./routes/managerRoutes');
const itemsRoute = require('./routes/items');


const app = express();

// Logging Middleware
app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  next();
});

// Session Middleware 
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'test_secret', // Fallback for tests
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  }),
);

// Keycloak Middleware
app.use(keycloak.middleware());

// CORS & JSON Middleware
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  }),
);

app.use(bodyParser.json());

app.use(
  '/api-docs',
  keycloak.protect('realm:admin'),
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec),
);

// Public Route 
app.get('/api/public', (req, res) => {
  res.json({
    message: 'This is a public route'
  });
});

// Protected Routes 
app.get('/api/protected', keycloak.protect(), (req, res) => {
  res.json({
    message: 'The credentials are valid !'
  });
});

// Admin-Only Route
app.get('/api/admin', keycloak.protect('realm:admin'), (req, res) => {
  res.json({
    message: 'Admin-only route'
  });
});

app.use('/api/items', itemsRoute);


app.use('/api/users', keycloak.protect(), userRoutes);
app.use('/api/departments', keycloak.protect(), departmentRoutes);
app.use('/api/managers', keycloak.protect(), managerRoutes);

// Connect to Database
connectDB();

// Handle API Errors
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({
    error: 'Internal Server Error'
  });
});

// Handle 404 Errors (Route Not Found)
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found'
  });
});

// Export the app for testing
module.exports = app;