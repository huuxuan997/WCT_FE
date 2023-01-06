var homepage = require("../../page/homePage");
var registerpage = require("../../page/registerPage");
const login = require("../../page/login");
const URL = "https://staging-wct.azurewebsites.net/top-master";
describe("Register feature", () => {
  beforeEach(() => {
    cy.login("mhxdec211@drowblock.com", "Admin@1234");
  });
  it("Verify Full name of Register Max length: 50", () => {
    //cy.visit(URL);
    if (true) {
      console.log(true);
    }
  });
});
