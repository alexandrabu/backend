// Placeholder for custom Cypress commands
Cypress.Commands.add("login", (username, password) => {
    cy.request("POST", "/api/auth/login", { username, password }).then((res) => {
        localStorage.setItem("token", res.body.token);
    });
});
