const app = require('./app');
const cors = require('cors');
const itemsRoute = require('./routes/items');
const allowedOrigins = ['http://localhost:3000'];


// Registering the items route
app.use('/api/items', itemsRoute);

// Start the server only if not in test mode
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}