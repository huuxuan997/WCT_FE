// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// var login = require("../page/loginPage");
// var homepage = require("../page/homePage");
// Cypress.Commands.add("login", (username, password) => {
//   cy.visit("https://staging-wct.azurewebsites.net");
//   cy.get(homepage.loginInBtn).click();
//   cy.get('[placeholder="Enter email or phone number"]').type(
//     "mhxdec23@drowblock.com"
//   );
//   cy.get(login.inputPW).type("Admin@1234", { log: false });
//   cy.get(login.loginBtn).contains("Login").click();
// });
