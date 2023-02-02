const url = "https://staging-wct.azurewebsites.net/";
describe("Forgot password feature", () => {
  beforeEach(() => {
    cy.visit(url);
    cy.contains("Log in").click();
    cy.contains("Forgot your password").click();
    cy.url().should("contains", "forgot-password");
  });
  it("Verify It only can input Email with length not more than 50", () => {
    cy.get('[placeholder="Enter email"]').type(
      "mhxdec23123123123123123111232312233123@drowblock.com"
    );
    cy.get('[placeholder="Enter email"]')
      .invoke("attr", "value")
      .should("be.length", 50);
  });
  it('Verify receive message with content "Please fill out this field!" If this field is null', () => {
    cy.contains("Send").click();
    cy.contains("Please fill out this field!").should("be.visible");
  });
  it("Verify receive error when input incorrect email format", () => {
    cy.get('[placeholder="Enter email"]').type("mhxdec123drowblock.com");
    cy.contains(
      "Incorrect email format, make sure you entered correctly!"
    ).should("be.visible");
  });
  it("Verify receive error when inputting email not exist on the system", () => {
    cy.get('[placeholder="Enter email"]').type(
      "mhxdec12311123123123123123@drowblock.com"
    );
    cy.contains("Send").click();
    cy.contains("Email is not already exists").should("be.visible");
  });
  it.only("Verify It will navigate to the Check your email screen if is correct", () => {
    cy.get('[placeholder="Enter email"]').type("mhxdec23@drowblock.com");
    cy.contains("Send").click();
    cy.contains("Check your email").should("be.visible");
    cy.contains(
      "You should receive the email shortly. Please use the link in the email mhxdec23@drowblock.com to reset your password."
    ).should("be.visible");
  });
});
