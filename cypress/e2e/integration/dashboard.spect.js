describe("1._ Debe existir una página que muestre el catálogo de productos", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("En esta seccion debe mostrarse el catálogo de productos, en este caso especialmente será tomada en cuenta la capacidad de asimilar la información de entrada y como se muestra al usuario final", () => {
    cy.get('[data-testid="email-form-field"] input').type("cuenta@gmail.com");
    cy.get('[data-testid="password-form-field"] input').type("Zodiaco123");
    cy.get('[data-testid="login-button"]').click();

    cy.get("mat-spinner").should("not.exist");

    cy.get("mat-snack-bar-container")
      .should("be.visible")
      .and("contain.text", "Sesión iniciada con éxito");

    cy.url().should("eq", Cypress.config().baseUrl + "dashboard");

    cy.get(".product-grid .product-item")
      .should("exist")
      .and("have.length.greaterThan", 0);

    cy.get(".no-products").should("not.exist");
  });
});

describe("2._ Filtrado y agrupado de productos", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("Mostrar productos por categoria, precio asc-desc, rango de precios, paginado, por calificación", () => {
    cy.get('[data-testid="email-form-field"] input').type("cuenta@gmail.com");
    cy.get('[data-testid="password-form-field"] input').type("Zodiaco123");
    cy.get('[data-testid="login-button"]').click();

    cy.get("mat-spinner").should("not.exist");

    cy.get("mat-snack-bar-container")
      .should("be.visible")
      .and("contain.text", "Sesión iniciada con éxito");

    cy.url().should("eq", Cypress.config().baseUrl + "dashboard");

    cy.get(".product-grid .product-item")
      .should("exist")
      .and("have.length.greaterThan", 0);

    cy.get(".no-products").should("not.exist");

    cy.get('[data-testid="open-nav-test"]').click();

    cy.get('[data-testid="sidenav-test"]').should("exist").and("be.visible");

    cy.get('[data-testid="category-input-test"]')
      .should("exist")
      .and("be.visible");
    cy.get('[data-testid="order-input-test"]')
      .should("exist")
      .and("be.visible");
    cy.get('[data-testid="asc-desc-input-test"]')
      .should("exist")
      .and("be.visible");
    cy.get('[data-testid="rating-input-test"]')
      .should("exist")
      .and("be.visible");
    cy.get('[data-testid="minimum-price-input-test"]')
      .should("exist")
      .and("be.visible");
    cy.get('[data-testid="maximum-price-input-test"]')
      .should("exist")
      .and("be.visible");

    cy.get('[data-testid="close-nav-test"]').click();

    cy.get('[data-testid="sidenav-test"]')
      .should("not.have.class", "sidenav-opened")
      .and("not.be.visible");
  });
});
