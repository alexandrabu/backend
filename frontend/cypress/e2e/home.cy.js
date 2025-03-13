describe("Home Page Test", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Displays the home page correctly", () => {
        cy.contains("As an admin, you have access to the API documentation.").should("not.exist");
    });

    it("Displays the admin message when logged in as admin", () => {
        cy.window().then((win) => {
            win.Keycloak = {
                authenticated: true,
                tokenParsed: {
                    realm_access: { roles: ["admin"] },
                },
            };
        });

        cy.reload(); // Ensure React re-renders

        // Wait for the DOM update
        cy.contains("As an admin, you have access to the API documentation.", { timeout: 10000 }).should("be.visible");
    });
});
