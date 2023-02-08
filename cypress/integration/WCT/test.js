const url = "https://staging-wct.azurewebsites.net/";
describe("Password reset", () => {
  const serverId = "dn3r1udg"; // Replace SERVER_ID with an actual Mailosaur Server ID
  const testEmail = `something@${serverId}.mailosaur.net`;

  it("Makes a Password Reset request", () => {
    cy.visit("https://staging-wct.azurewebsites.net/");
    cy.contains("Log in").click();
    cy.contains("Forgot your password").click();
    //cy.title().should("equal", "Forgot your password?");
    cy.get('[placeholder="Enter email"]').type(testEmail);
    cy.contains("Send").click();
  });

  it("Gets a Password Reset email", () => {
    cy.mailosaurGetMessage(serverId, {
      sentTo: testEmail,
    }).then((email) => {
      //expect(email.subject).to.equal("Reset your password");
      passwordResetLink = email.text.links[0].href;
    });
  });

  it("Follows the link from the email", () => {
    const validPassword = "delighted cheese jolly cloud";

    cy.visit(passwordResetLink);
    cy.title().should("contain", "Change your password");
    cy.get("#password").type(validPassword);
    cy.get("#password_confirmation").type(validPassword);
    cy.get("form").submit();
  });
});
