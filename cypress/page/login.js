Cypress.Commands.add("login", (username, password) => {
  cy.session([username, password], () => {
    cy.visit("https://staging-wct.azurewebsites.net/");
    cy.get('button[data-testid="btn-login"]').click();
    cy.get('input[data-testid="email"]').type(username);
    cy.get('input[data-testid="password"]').type(password);
    cy.get('button[type="submit"]');
  });
});
