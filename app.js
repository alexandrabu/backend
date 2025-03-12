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

// **CORS Configuration**
const corsOptions = {
  origin: process.env.CORS_ORIGIN.split(','), // Allow multiple origins from env
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow cookies/session credentials
};

app.use(cors(corsOptions));

// **Session Middleware**
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'test_secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);

// **Keycloak Middleware**
app.use(keycloak.middleware());

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
app.get('/api/protected', keycloak.protect(), (req, res) => {
  res.json({ message: 'The credentials are valid!' });
});

// **Admin-Only Route**
app.get('/api/admin', keycloak.protect('realm:admin'), (req, res) => {
  res.json({ message: 'Admin-only route' });
});

// **Register API Routes**
app.use('/api/items', itemsRoute);
app.use('/api/users', keycloak.protect(), userRoutes);
app.use('/api/departments', keycloak.protect(), departmentRoutes);
app.use('/api/managers', keycloak.protect(), managerRoutes);
app.use('/api/combined-data', combinedRoutes);

// **Connect to Database**
connectDB();

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
