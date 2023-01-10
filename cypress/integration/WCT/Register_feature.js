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
  it("Verify first name & last name of Register Max length: 50", () => {
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
    cy.get(".form-control").type("1231231244");
    cy.get('[placeholder="Enter email"]').type("mhxtest1244@mail.com");
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
  it("Verify field Fullname must not be empty", () => {
    cy.get(".css-2n5ts8").click();
    cy.contains(registerpage.registerBtn, "Register").click();
    cy.get(".flag-dropdown.btn-dropdown > div")
      .invoke("attr", "title")
      .should("contain", "Vietnam: + 84");
  });
  it("Verify field Phone number must not be empty", () => {
    cy.get('[data-testid="firstName"]').type("Xuan");
    cy.get('[data-testid="lastName"]').type("Mai");
    cy.get(".form-control").clear();
    //cy.contains(registerpage.registerBtn, "Register").click();
    cy.get(".css-1bw5r1j")
      .should("be.visible")
      .and("contain", "Please fill out this field !");
  });
  it("Verify field phone number Max length = 15", () => {
    cy.get('[data-testid="firstName"]').type("Xuan");
    cy.get('[data-testid="lastName"]').type("Mai");
    cy.get(".form-control").type("123456789123123123123");
    //cy.contains(registerpage.registerBtn, "Register").click();
    console.log(
      cy.get(".form-control").invoke("attr", "value").should("have.length", 21)
    );
  });
  it("Verify field phone number only numeric characters are accepted", () => {
    cy.get('[data-testid="firstName"]').type("Xuan");
    cy.get('[data-testid="lastName"]').type("Mai");
    cy.get(".form-control").type("aaaaaaa~!@#$%^&*-_+=+");
    //cy.contains(registerpage.registerBtn, "Register").click();
    cy.get(".form-control").invoke("attr", "value").should("contain", "+84");
  });
  it("Verify field Email Only accept email format", () => {
    cy.get('[data-testid="firstName"]').type("Xuan");
    cy.get('[data-testid="lastName"]').type("Mai");
    cy.get(".form-control").type("12345678912312312312 3");
    cy.get('[placeholder="Enter email"]').type("mhxtest1242mail.com");
    cy.get(".css-1bw5r1j")
      .should("be.visible")
      .and(
        "contain",
        "Incorrect email format, make sure you entered correctly!"
      );
  });
  it("Verify field Email max length= 50", () => {
    cy.get('[data-testid="firstName"]').type("Xuan");
    cy.get('[data-testid="lastName"]').type("Mai");
    cy.get(".form-control").type("12345678912312312312 3");
    cy.get('[placeholder="Enter email"]').type(
      "mhxtest12421231231ssssss23123123123123123@mail.com.vn"
    );
    cy.get('[placeholder="Enter email"]')
      .invoke("attr", "value")
      .should("have.length", 50);
  });
  it("Verify field Email must not be empty", () => {
    cy.get('[data-testid="firstName"]').type("Xuan");
    cy.get('[data-testid="lastName"]').type("Mai");
    cy.get(".form-control").type("12345678912312312312 3");
    cy.get('[placeholder="Enter password"]').type("Admin@1234");
    cy.get(".css-rk6200 > :nth-child(1)").click(170, 75);
    cy.get('[name="reTypePassword"]').type("Admin@1234");
    cy.get(".css-2n5ts8").click();
    cy.contains(registerpage.registerBtn, "Register").click();
    cy.get(".css-1bw5r1j")
      .should("be.visible")
      .and("contain", "Please fill out this field !");
  });
  it("Verify field Password Accepted password format, default: * character", () => {
    cy.get('[name="password"]')
      .invoke("attr", "type")
      .should("contain", "password");
    cy.get('[name="reTypePassword"]')
      .invoke("attr", "type")
      .should("contain", "password");
  });
  it("Verify field Password have  max length = 16", () => {
    cy.get('[placeholder="Enter password"]').type(
      "Admin@12346789123123123123123123"
    );
    cy.get(".css-rk6200 > :nth-child(1)").click(170, 75);
    cy.get('[name="reTypePassword"]').type("Admin@12346789123123123123123123");
    cy.get('[placeholder="Enter password"]')
      .invoke("attr", "value")
      .should("have.length", 16);
    cy.get('[name="reTypePassword"]')
      .invoke("attr", "value")
      .should("have.length", 16);
  });
  it("Verify field Password have  max length = 16", () => {
    cy.get('[placeholder="Enter password"]').focus();
    cy.get(".css-38xxpf")
      .should("be.visible")
      .and("contain", "Your password must:");
  });
  it("Verify that the system displays the content when the user enters the wrong password", () => {
    cy.get('[placeholder="Enter password"]').focus();
    cy.get('[aria-label="validate-item-0"]').should(
      "have.css",
      "color",
      "rgb(163, 163, 163)"
    );
    cy.get('[aria-label="validate-item-1"]').should(
      "have.css",
      "color",
      "rgb(163, 163, 163)"
    );
    cy.get('[aria-label="validate-item-2"]').should(
      "have.css",
      "color",
      "rgb(163, 163, 163)"
    );
    cy.get('[aria-label="validate-item-3"]').should(
      "have.css",
      "color",
      "rgb(163, 163, 163)"
    );
    cy.get('[aria-label="validate-item-4"]').should(
      "have.css",
      "color",
      "rgb(163, 163, 163)"
    );
    cy.get('[placeholder="Enter password"]')
      .type("Bb")
      .then(() => {
        cy.get('[aria-label="validate-item-0"]').should(
          "have.css",
          "color",
          "rgb(239, 68, 68)"
        );
        cy.get('[aria-label="validate-item-1"]').should(
          "have.css",
          "color",
          "rgb(34, 197, 94)"
        );
        cy.get('[aria-label="validate-item-2"]').should(
          "have.css",
          "color",
          "rgb(239, 68, 68)"
        );
        cy.get('[aria-label="validate-item-3"]').should(
          "have.css",
          "color",
          "rgb(239, 68, 68)"
        );
        cy.get('[aria-label="validate-item-4"]').should(
          "have.css",
          "color",
          "rgb(34, 197, 94)"
        );
      });
    cy.get('[placeholder="Enter password"]')
      .type("1")
      .then(() => {
        cy.get('[aria-label="validate-item-0"]').should(
          "have.css",
          "color",
          "rgb(239, 68, 68)"
        );
        cy.get('[aria-label="validate-item-1"]').should(
          "have.css",
          "color",
          "rgb(34, 197, 94)"
        );
        cy.get('[aria-label="validate-item-2"]').should(
          "have.css",
          "color",
          "rgb(34, 197, 94)"
        );
        cy.get('[aria-label="validate-item-3"]').should(
          "have.css",
          "color",
          "rgb(239, 68, 68)"
        );
        cy.get('[aria-label="validate-item-4"]').should(
          "have.css",
          "color",
          "rgb(34, 197, 94)"
        );
      });
    cy.get('[placeholder="Enter password"]')
      .type("@")
      .then(() => {
        cy.get('[aria-label="validate-item-0"]').should(
          "have.css",
          "color",
          "rgb(239, 68, 68)"
        );
        cy.get('[aria-label="validate-item-1"]').should(
          "have.css",
          "color",
          "rgb(34, 197, 94)"
        );
        cy.get('[aria-label="validate-item-2"]').should(
          "have.css",
          "color",
          "rgb(34, 197, 94)"
        );
        cy.get('[aria-label="validate-item-3"]').should(
          "have.css",
          "color",
          "rgb(34, 197, 94)"
        );
        cy.get('[aria-label="validate-item-4"]').should(
          "have.css",
          "color",
          "rgb(34, 197, 94)"
        );
      });
    cy.get('[placeholder="Enter password"]')
      .type("123123")
      .then(() => {
        cy.get('[aria-label="validate-item-0"]').should(
          "have.css",
          "color",
          "rgb(34, 197, 94)"
        );
        cy.get('[aria-label="validate-item-1"]').should(
          "have.css",
          "color",
          "rgb(34, 197, 94)"
        );
        cy.get('[aria-label="validate-item-2"]').should(
          "have.css",
          "color",
          "rgb(34, 197, 94)"
        );
        cy.get('[aria-label="validate-item-3"]').should(
          "have.css",
          "color",
          "rgb(34, 197, 94)"
        );
        cy.get('[aria-label="validate-item-4"]').should(
          "have.css",
          "color",
          "rgb(34, 197, 94)"
        );
      });
  });
  it("Verify  when the user click on/off the eye button default off", () => {
    cy.get('[placeholder="Enter password"]').type("Admin@1234");
    cy.get(".css-1embzhs").click();
    cy.get('[placeholder="Enter password"]')
      .invoke("attr", "type")
      .should("contain", "text");
    cy.get(".css-1embzhs").click();
    cy.get('[placeholder="Enter password"]')
      .invoke("attr", "type")
      .should("contain", "password");
  });
  it("Verify the system display content “Password does not match, please re-type!”when user input Re-type password  does not match password field", () => {
    cy.get('[placeholder="Enter password"]').type("Admin@1234");
    cy.get(".css-rk6200 > :nth-child(1)").click(170, 75);
    cy.get('[name="reTypePassword"]').type("Admin@12346");
    cy.get(".css-1bw5r1j")
      .should("be.visible")
      .and("contain", "Password does not match, please re-type!");
  });
  // check UX/UI
  it.skip("Verify It should be same as the Design Figma", () => {});
});
