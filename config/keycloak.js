const session = require('express-session');
const Keycloak = require('keycloak-connect');
require('dotenv').config();

const memoryStore = new session.MemoryStore();


const requiredKeycloakVars = ["KEYCLOAK_REALM", "KEYCLOAK_URL", "KEYCLOAK_CLIENT_ID"];
requiredKeycloakVars.forEach((key) => {
    if (!process.env[key]) {
        throw new Error(`Missing required Keycloak environment variable: ${key}`);
    }
});


const keycloak = new Keycloak({ store: memoryStore }, {
    realm: process.env.KEYCLOAK_REALM,
    "auth-server-url": process.env.KEYCLOAK_URL,
    resource: process.env.KEYCLOAK_CLIENT_ID,
    "public-client": process.env.KEYCLOAK_PUBLIC_CLIENT === "true",
    "confidential-port": process.env.KEYCLOAK_CONFIDENTIAL_PORT || 0
});

module.exports = { keycloak, memoryStore };
