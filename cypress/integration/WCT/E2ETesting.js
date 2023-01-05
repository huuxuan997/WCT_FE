var homepage = require("../../page/homePage");
var loginpage = require("../../page/loginPage");
const URL = "https://staging-wct.azurewebsites.net";
describe("My First Test", function () {
  it("Access to WCT", function () {
    cy.viewport(1920, 1200);
    cy.visit(URL);
    cy.get(homepage.loginInBtn).click();
    cy.get(loginpage.inputUserName).type("mhxdec211@drowblock.com");
    cy.get(loginpage.inputPW).type("Admin@1234");
    cy.get(loginpage.loginBtn).click();
    cy.get(homepage.headerWCT).contains("WeCopyTrade");
    cy.url();
  });
});
