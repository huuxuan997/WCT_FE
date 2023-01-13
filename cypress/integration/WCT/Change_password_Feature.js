var homepage = require("../../page/homePage");
var login = require("../../page/loginPage");
var changepw = require("../../page/Change_password");
const URL = "https://staging-wct.azurewebsites.net";
const { beforeEach } = require("mocha");
const commands = require("../..//support/commands");
describe("Change password feature", () => {
  beforeEach(() => {
    cy.visit(URL);
    cy.get(homepage.loginInBtn).click();
    cy.get(login.inputUserName).type("mhxdec23@drowblock.com");
    cy.get(login.inputPW).type("Admin@1234");
    cy.get(login.loginBtn).click();
    cy.wait(3000);
    cy.get(".css-1xdhyk6").click();
    cy.get(":nth-child(1) > .css-18fwtno > .css-r2eq3w").click();
  });
  // before("Before the test clear previous Cookies", () => {
  //   cy.wait(2000);
  //   cy.clearCookies();
  //   cy.login(Cypress.env("mhxdec23@drowblock.com"), Cypress.env("Admin@1234"));
  //   cy.get(".css-1xdhyk6").click();
  //   cy.get(":nth-child(1) > .css-18fwtno > .css-r2eq3w").click();
  // });
  it("Verify it should be change password and go to log in successfully ", () => {
    cy.get(changepw.currentPW).type("Admin@1234");
    cy.get(changepw.newPW).type("Admin@1234");
    cy.get(".css-1tg2t9y").click();
    cy.get(changepw.retypePW).type("Admin@1234");
    cy.get(changepw.submit).click();
    cy.get(".css-go9016")
      .should("be.visible")
      .and("contain", "Login to WecopyTrade");
    cy.get(login.inputUserName).type("mhxdec23@drowblock.com");
    cy.get(login.inputPW).type("Admin@1234");
    cy.get(login.loginBtn).click();
    cy.get(".css-1w6tfoi").should("contain", "My accounts");
  });
  it("Verify it receive error when inputting incorrect current password data", () => {
    cy.get(changepw.currentPW).type("Admin@12345");
    cy.get(changepw.newPW).type("Admin@1234");
    cy.get(".css-1tg2t9y").click();
    cy.get(changepw.retypePW).type("Admin@1234");
    cy.get(changepw.submit).click();
    cy.get(".css-10nkpw9")
      .find(".alert-title")
      .should("be.visible")
      .and(
        "contain",
        "Your current password is incorrect, make sure you entered correctly!"
      );
  });
  it("Verify it receive error when leaving fields blank", () => {
    cy.get(changepw.submit).click();
    cy.get(changepw.alert)
      .parent(".css-10nkpw9")
      .should("be.visible", { multiple: true })
      .and("contain", "Please fill out this field !");
  });
  it("Verify it receive error when inputting Re-type new password does not match new password field", () => {
    cy.get(changepw.currentPW).type("Admin@1234");
    cy.get(changepw.newPW).type("Admin@1234");
    cy.get(".css-1tg2t9y").click();
    cy.get(changepw.retypePW).type("Admin@12345");
    cy.get(changepw.submit).click();
    cy.get(".css-1bw5r1j")
      .should("be.visible")
      .and("contain", "Re-type new password does not match, please re-type!");
  });
  it("Verify the symbol password when clicking on/off the eye", () => {
    cy.get(changepw.currentPW).type("Admin@1234");
    cy.get(changepw.newPW).type("Admin@1234");
    cy.get(".css-1tg2t9y").click();
    cy.get(changepw.retypePW).type("Admin@1234");
    cy.get(".css-1embzhs").eq(0).click();
    cy.get(".css-1embzhs").eq(1).click();
    cy.get(".css-1tg2t9y").click();
    cy.get(".css-1embzhs").eq(2).click();
    cy.get(changepw.currentPW).invoke("attr", "type").should("contain", "text");
    cy.get(changepw.newPW).invoke("attr", "type").should("contain", "text");
    cy.get(changepw.retypePW).invoke("attr", "type").should("contain", "text");
    cy.get(".css-1embzhs").eq(0).click();
    cy.get(".css-1embzhs").eq(1).click();
    cy.get(".css-1tg2t9y").click();
    cy.get(".css-1embzhs").eq(2).click();
    cy.get(changepw.currentPW)
      .invoke("attr", "type")
      .should("contain", "password");
    cy.get(changepw.newPW).invoke("attr", "type").should("contain", "password");
    cy.get(changepw.retypePW)
      .invoke("attr", "type")
      .should("contain", "password");
  });
  it("Verify it clear password in textbox after change password successfully", () => {
    cy.get(changepw.currentPW).type("Admin@1234");
    cy.get(changepw.newPW).type("Admin@1234");
    cy.get(".css-1tg2t9y").click();
    cy.get(changepw.retypePW).type("Admin@12345");
    cy.get(".css-1m5f4l").click();
    cy.get(".css-1xdhyk6").click();
    cy.get(":nth-child(1) > .css-18fwtno > .css-r2eq3w").click();
    cy.get(".css-10nkpw9").should("contain", "", { multiple: true });
  });
});
