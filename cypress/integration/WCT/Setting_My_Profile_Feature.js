const loginpage = require("../../page/loginPage");
const num = Math.floor(Math.random() * 1000);
const rdFName = "Xuan" + num;
const rdLName = "Mai" + num;
const rdPN = Math.floor(Math.random() * 100000000);
const rdTN = "09" + rdPN;
const dt = require("../../fixtures/data.json");
//const formatPhoneNumber = rdTN.formatInternational();
//console.log();
const login = (name) => {
  cy.session(name, () => {
    cy.visit("https://staging-wct.azurewebsites.net");
    cy.contains("Log in").click();
    cy.get(loginpage.inputUserName).type(name);
    cy.get(loginpage.inputPW).type(dt[0].password);
    cy.get(loginpage.loginBtn).click();
    cy.wait(2000);
    cy.contains("Log in").should("not.exist");
    cy.url().should("contains", "top-master");
  });
};

beforeEach(() => {
  login(dt[0].email);
  cy.visit("https://staging-wct.azurewebsites.net");
  cy.contains("Setting").click();
});
it("Verify it should be change profile after save profile successfully", () => {
  cy.get('[name="firstName"]').clear({ setTimeout: 3000 });
  cy.get('[name="lastName"]').clear({ setTimeout: 3000 });
  cy.get('[placeholder="Enter phone number"]').clear({ setTimeout: 3000 });
  cy.get('[name="firstName"]').type(rdFName);
  cy.get('[name="lastName"]').type(rdLName);
  cy.get('[placeholder="Enter phone number"]').type(rdTN);
  cy.get("#gender").click();
  cy.get("#react-select-4-option-1").click();
  cy.get("#country").click();
  cy.get("#react-select-5-option-244").click();
  cy.contains("Save").click();
  cy.contains(rdFName + " " + rdLName);
  cy.visit("https://staging-wct.azurewebsites.net");
});

it("Verify it should be show old data again when click on reset button", () => {
  cy.get('[name="firstName"]').clear({ setTimeout: 3000 });
  cy.get('[name="lastName"]').clear({ setTimeout: 3000 });
  cy.get('[name="firstName"]').type("Xuan9999");
  cy.get('[name="lastName"]').type("Mai99999");
  cy.get('[placeholder="Enter phone number"]').type("098646723678");
  cy.get("#gender").click();
  cy.get("#react-select-4-option-1").click();
  cy.get("#country").click();
  cy.get("#react-select-5-option-222").click();
  cy.contains("Reset").click();
  cy.get('[name="firstName"]')
    .invoke("attr", "value")
    .should("contains", rdFName);
  cy.get('[name="lastName"]')
    .invoke("attr", "value")
    .should("contains", rdLName);

  cy.get('[placeholder="Enter phone number"]')
    .invoke("attr", "value")
    .then(($value) => {
      expect($value.split("+")[1].split(" ").join("")).to.include(rdTN);
    });
  cy.get("#gender").should("have.text", "Female");
  cy.contains("Vietnam").should("be.visible");
});

it("Verify it should be navigate to the KYC screen when click on KYC status except KYC verified status", () => {
  cy.get('[data-testid="chip"]').click();
  cy.contains("Proof of identification").should("be.visible");
});

it("Verify it should be display email of wecopytrade account in my profile", () => {
  cy.contains(dt[0].email).should("be.visible");
});

it("Verify the last, first name, and country code in my profile the same as with entered data in the register popup", () => {
  cy.get(".css-9c1i91").click();
  cy.contains("Log out").click();
  cy.contains("Log out").click();
});

it.only('Verify it receive an error with the content "Please fill out this field!" when leaving required fields blank', () => {
  cy.get('[name="firstName"]').clear({ setTimeout: 3000 });
  cy.get('[name="lastName"]').clear({ setTimeout: 3000 });
  cy.get('[placeholder="Enter phone number"]').clear({ setTimeout: 3000 });
  cy.contains("Save").click();
  cy.contains("Please fill out this field!").should("be.visible", {
    multiple: true,
  });
});
