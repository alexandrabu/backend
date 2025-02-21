module.exports = {
    testTimeout: 30000,
    testEnvironment: "node",
    coverageDirectory: "coverage",
    collectCoverage: true,
    coverageReporters: ["text", "lcov"],
    collectCoverageFrom: [
        "**/*.js",
        "!**/*.test.js",
        "!jest.config.js"
    ],
    moduleNameMapper: {
        "^./config/keycloak$": "<rootDir>/__mocks__/keycloak.js"
    }

};
