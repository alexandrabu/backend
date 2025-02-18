const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Backend API',
            version: '1.0.0',
            description: 'API documentation for user, department, and manager operations',
        },
        servers: [{ url: 'http://localhost:5000/api' }],
    },
    apis: ['./routes/*.js'],
};

module.exports = swaggerJsdoc(options);
