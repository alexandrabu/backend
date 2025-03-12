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
const combinedRoutes = require('./routes/combinedRoutes');
const itemsRoute = require('./routes/items');

const app = express();

// **Detect Test Environment**
const isTest = process.env.NODE_ENV === 'test';

// **CORS Configuration**
const corsOptions = {
  origin: process.env.CORS_ORIGIN?.split(',') || '*', // Allow multiple origins from env
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow cookies/session credentials
};

app.use(cors(corsOptions));

// **Session Middleware (Disabled in Tests)**
if (!isTest) {
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'test_secret',
      resave: false,
      saveUninitialized: true,
      store: memoryStore,
    })
  );
}

// **Keycloak Middleware (Disabled in Tests)**
if (!isTest) {
  app.use(keycloak.middleware());
}

// **Logging Middleware (Debugging)**
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  next();
});

// **Body Parsing Middleware**
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// **Swagger API Documentation**
app.use(
  '/api-docs',
  keycloak.protect('realm:admin'),
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec),
);

// **Public Routes (No authentication required)**
app.get('/api/public', (req, res) => {
  res.json({ message: 'This is a public route' });
});

// **Protected Routes**
app.get('/api/protected', isTest ? (req, res) => res.json({ message: 'Test mode bypass' }) : keycloak.protect(), (req, res) => {
  res.json({ message: 'The credentials are valid!' });
});

// **Admin-Only Route**
app.get('/api/admin', isTest ? (req, res) => res.json({ message: 'Test mode bypass' }) : keycloak.protect('realm:admin'), (req, res) => {
  res.json({ message: 'Admin-only route' });
});

// **Register API Routes (Disable Auth in Tests)**
if (isTest) {
  console.log('Running in test mode - Keycloak authentication is disabled');
  app.use('/api/users', userRoutes);
  app.use('/api/departments', departmentRoutes);
  app.use('/api/managers', managerRoutes);
} else {
  app.use('/api/users', keycloak.protect(), userRoutes);
  app.use('/api/departments', keycloak.protect(), departmentRoutes);
  app.use('/api/managers', keycloak.protect(), managerRoutes);
}

app.use('/api/combined-data', combinedRoutes);
app.use('/api/items', itemsRoute);

// **Connect to Database**
if (!isTest) {
  connectDB();
}

// **Handle API Errors**
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// **Handle 404 Errors**
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Export the app for testing
module.exports = app;
