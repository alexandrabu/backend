const { Sequelize } = require('sequelize');
require('dotenv').config();


const requiredEnvVars = ["DB_NAME", "DB_USER", "DB_PASSWORD", "DB_HOST", "DB_PORT"];
requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

// Configured Database Connections; connection pooling used to optimize database performance.
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: process.env.DB_PORT || 5432,
  logging: false,  // Set to 'console.log' for debugging
  pool: {
    max: 10,        // Maximum number of connections in pool
    min: 0,         // Minimum number of connections in pool
    acquire: 30000, // Maximum time (ms) a connection can be idle
    idle: 10000     // Maximum time (ms) before a connection is released
  },
  define: {
    timestamps: false, // Disable default timestamps 
  }
});

//  Function to Establish Connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully (Docker PostgreSQL).');
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
