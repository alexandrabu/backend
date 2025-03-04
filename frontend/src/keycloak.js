import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: process.env.REACT_APP_KEYCLOAK_URL,
    realm: process.env.REACT_APP_KEYCLOAK_REALM,
    clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID
});


keycloak.onTokenExpired = () => {
    keycloak.updateToken(30).then((refreshed) => {
        if (refreshed) {
            console.log(' Token refreshed');
        } else {
            console.warn('Token not refreshed, user is still logged in');
        }
    }).catch(() => {
        console.error(' Failed to refresh token');
    });
};

export default keycloak;
