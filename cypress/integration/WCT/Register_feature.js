//const { beforeEach } = require("mocha");
var homepage = require("../../page/homePage");
var registerpage = require("../../page/registerPage");
const URL = "https://staging-wct.azurewebsites.net";
describe("Register feature", () => {
  beforeEach(() => {
    cy.visit(URL);
    cy.get(homepage.registerBtn).click();
  });
  it("Verify first name & last name of Register Max length: 50", () => {
    cy.get('[data-testid="firstName"]').type(
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    );
    expect(
      cy
        .get('[data-testid="firstName"]')
        .invoke("attr", "value")
        .should("have.length", 50)
    );
    cy.get('[data-testid="lastName"]').type(
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    );
    expect(
      cy
        .get('[data-testid="lastName"]')
        .invoke("attr", "value")
        .should("have.length", 50)
    );
    cy.get(registerpage.registerBtn).click();
  });
});
