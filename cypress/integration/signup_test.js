import "cypress-react-selector";
import "@testing-library/cypress/add-commands";

describe("Register Page", () => {
  //need to implement a way to reset db each test

  var num = Math.floor(Math.random() * 100 + 1);

  it("test valid signup", () => {
    cy.waitForReact();

    cy.visit("http://localhost:3000/home/login");
    cy.get("button").eq(1).click();
    cy.url().should("eq", "http://localhost:3000/home/signup");

    cy.get("input").eq(0).type("Randy");
    cy.get("input").eq(1).type("Marsh");
    cy.get("input")
      .eq(2)
      .type("randy" + num + "@email.com");
    cy.get("input").eq(3).type("aA@12345678");
    cy.get("input").eq(4).type("aA@12345678");
    cy.get("button").last().click();

    cy.url().should("eq", "http://localhost:3000/signup");

    cy.findByRole("heading", { name: /Congratulations!/i }).should("exist");
  });

  it("test duplicate email signup", () => {
    cy.visit("http://localhost:3000/home/login");
    cy.get("button").eq(1).click();
    cy.url().should("eq", "http://localhost:3000/home/signup");

    cy.get("input").eq(0).type("Eric");
    cy.get("input").eq(1).type("Cartman");
    cy.get("input").eq(2).type("cartman@email.com");
    cy.get("input").eq(3).type("aA@12345678");
    cy.get("input").eq(4).type("aA@12345678");
    cy.get("button").last().click();
    cy.url().should("eq", "http://localhost:3000/home/signup");
  });
});
