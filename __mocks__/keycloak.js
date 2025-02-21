// __mocks__/keycloak.js

// Mocking memoryStore as a compatible store for express-session
const memoryStore = {
    on: jest.fn(),
    get: jest.fn(),
    set: jest.fn(),
    destroy: jest.fn()
};

// Mocking keycloak with essential methods for testing
const keycloak = {
    protect: () => (req, res, next) => next(),  // Allow all requests to pass for testing
    middleware: () => (req, res, next) => next() // Mock middleware method
};

module.exports = {
    keycloak,
    memoryStore
};
