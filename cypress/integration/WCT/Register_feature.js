var homepage = require("../../page/homePage");
var registerpage = require("../../page/registerPage");
const URL = "https://staging-wct.azurewebsites.net";
describe("Register feature", () => {
  it("Verify Full name of Register Max length: 50", () => {
    cy.visit(URL);
    cy.get(homepage.registerBtn).click();
    //expect(registerpage.headerRegister).
  });
});
