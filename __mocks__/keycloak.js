module.exports = {
  keycloak: {
    protect: () => (req, res, next) => {
      console.log('Keycloak mock is being used'); // Debugging
      next();
    },
    middleware: () => (req, res, next) => next(),
  },
  memoryStore: {},
};
