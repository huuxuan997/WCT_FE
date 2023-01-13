describe("test", () => {
  it("t", () => {
    cy.visit("https://temp-mail.io/en");
    cy.get('[data-original-title="Change email"]')
      .click("center")
      .click()
      .click();
    cy.get('[id="name"]').type("mhxdec211");
    cy.get(".domains-list__selected-domain").click();
    cy.get('[id="domains-list"]').contains("drowblock.com").click();
    cy.contains("Get it!").click();
    //cy.wait(10000);
    cy.get(".email-list").should("be.visible");
    cy.get(".message__body > :nth-child(1)").click();
  });
});
