//<reference Types = "Cypress"/>
var homepage = require("../../page/homePage");
var registerpage = require("../../page/registerPage");
const URL = "https://staging-wct.azurewebsites.net";
describe("Register feature", () => {
  beforeEach(() => {
    cy.visit(URL);
    cy.get(homepage.registerBtn).click();
    cy.wrap("css-xi606m");
  });
  it.skip("Verify first name & last name of Register Max length: 50", () => {
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
  it("Verify format full name 	Accept uppercase, lowercase, numeric, special characters", () => {
    cy.get('[data-testid="firstName"]').type(
      "Xuan~`!@#$%^&*()-_+={}[];:<,>./?"
    );
    cy.get('[data-testid="lastName"]').type("Mai~`!@#$%^&*()-_+={}[];:<,>./?");
    cy.get(".selected-flag").click();
    cy.get(
      "#dialog-root > div.css-ngigpd > div > div.css-rk6200 > div > div.css-3dqpno > form > div:nth-child(3) > div > div.flag-dropdown.open.btn-dropdown > ul"
    )
      .contains(".country-name", "Vietnam")
      .click();
    cy.get(".form-control").type("1231231242");
    cy.get('[placeholder="Enter email"]').type("mhxtest1242@mail.com");
    cy.get('[placeholder="Enter password"]').type("Admin@1234");
    cy.get(".css-rk6200 > :nth-child(1)").click(170, 75);
    cy.get('[name="reTypePassword"]').type("Admin@1234");
    cy.get(".css-2n5ts8").click();
    cy.contains(registerpage.registerBtn, "Register").click();
    cy.get(".css-9un7a0").then(() => {
      cy.get(".css-9un7a0")
        .should("be.visible")
        .and("contain", "Check your email");
    });
  });
  it("Verify field Fullname must not be empty", () => {
    //cy.get('[data-testid="firstName"]').type(" ");
    //cy.get('[data-testid="lastName"]').type(" ");
    cy.get(".selected-flag").click();
    cy.get(
      "#dialog-root > div.css-ngigpd > div > div.css-rk6200 > div > div.css-3dqpno > form > div:nth-child(3) > div > div.flag-dropdown.open.btn-dropdown > ul"
    )
      .contains(".country-name", "Vietnam")
      .click();
    cy.get(".form-control").type("1231231242");
    cy.get('[placeholder="Enter email"]').type("mhxtest1242@mail.com");
    cy.get('[placeholder="Enter password"]').type("Admin@1234");
    cy.get(".css-rk6200 > :nth-child(1)").click(170, 75);
    cy.get('[name="reTypePassword"]').type("Admin@1234");
    cy.get(".css-2n5ts8").click();
    cy.contains(registerpage.registerBtn, "Register").click();
    cy.get(".css-1bw5r1j")
      .should("be.visible")
      .and("contain", "Please fill out this field !");
  });
  it.only("Verify field Fullname must not be empty", () => {
    cy.get(".css-2n5ts8").click();
    cy.contains(registerpage.registerBtn, "Register").click();
    cy.get(".flag-dropdown.btn-dropdown > div")
      .invoke("attr", "title")
      .should("contain", "Vietnam: + 84");
  });
});
