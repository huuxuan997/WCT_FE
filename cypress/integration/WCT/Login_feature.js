// <reference Type = "Cypress"/>
const url = "https://staging-wct.azurewebsites.net/";
const loginpage = require("../../page/loginPage");
describe("test", () => {
  beforeEach(() => {
    cy.visit(url);
    cy.contains("Log in").click();
  });
  it("Verify it can log in account successfully", () => {
    cy.get(loginpage.inputUserName).type("mhxdec23@drowblock.com");
    cy.get(loginpage.inputPW).type("Admin@1234");
    cy.get(loginpage.loginBtn).click();
    cy.wait(2000);
    cy.contains("Log in").should("not.exist");
    cy.url().should("contains", "top-master");
  });
  it('Verify error message "Please fill out this field!" if this field is null', () => {
    cy.get(loginpage.loginBtn).click();
    cy.get(".css-1bw5r1j")
      .should("be.visible")
      .contains("Please fill out this field !");
  });
  it("Verify error message when input incorrect email format", () => {
    cy.get(loginpage.inputUserName).type("mhxdec23drowblock.com");
    cy.get(loginpage.loginBtn).click();
    cy.contains(
      "Incorrect email format, make sure you entered correctly!"
    ).should("be.visible");
  });
  it("Verify error message when input incorrect password ", () => {
    cy.get(loginpage.inputUserName).type("mhxdec23@drowblock.com");
    cy.get(loginpage.inputPW).type("Admin@12345");
    cy.get(loginpage.loginBtn).click();
    cy.contains(
      "Incorrect email, phone number, or password. Make sure you entered correctly!"
    ).should("be.visible");
  });
  it("Verify error message when input email format more than 50 length", () => {
    cy.get(loginpage.inputUserName).type(
      "mhxdec23123123123123123111232312233123@drowblock.com"
    );
    cy.get(loginpage.inputUserName)
      .invoke("attr", "value")
      .should("be.length", 50);
  });
  it("Verify the symbol password when clicking on/off the eye", () => {
    cy.get(loginpage.inputUserName).type("mhxdec23@drowblock.com");
    cy.get(loginpage.inputPW).type("Admin@1234");
    cy.get(loginpage.inputPW)
      .invoke("attr", "type")
      .should("contains", "password");
    cy.get(".css-1embzhs").click();
    cy.get(loginpage.inputPW).invoke("attr", "type").should("contains", "text");
  });
});
