module.exports = {
  keycloak: {
    protect: () => (req, res, next) => next(),
    middleware: () => (req, res, next) => next(), // Correctly mocked as a middleware function
  },
  memoryStore: {},
};
