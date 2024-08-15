describe("Test para visitar página de registro", () => {
  it("Visitar", () => {
    cy.visit("/register");
  });
});

describe("1_Validación de la pantalla de registro", () => {
  beforeEach(() => {
    cy.visit("/register");
  });

  it("debería mantener el botón deshabilitado cuando el formulario es inválido y manejar la navegación correctamente", () => {
    cy.get('[data-testid="register-button"]').should("be.disabled");
    cy.get('[data-testid="register-button"]').click({ force: true });
    cy.get("mat-spinner").should("not.exist");
    cy.url().should("eq", Cypress.config().baseUrl + "register");
  });
});

describe("2_Validación de la pantalla de registro", () => {
  beforeEach(() => {
    cy.visit("/register");
  });

  it("debería mostrar mensajes de error cuando los campos están vacíos y mantener el botón deshabilitado", () => {
    cy.get('[data-testid="email-form-field"] input').focus().blur();
    cy.get('[data-testid="email-form-field"]')
      .find("mat-error")
      .should("contain.text", "Email is")
      .and("contain.text", "required");

    cy.get('[data-testid="password-form-field"] input').focus().blur();
    cy.get('[data-testid="password-form-field"]')
      .find("mat-error")
      .should("contain.text", "Password is")
      .and("contain.text", "required");

    cy.get('[data-testid="register-button"]').click({ force: true });

    cy.get("mat-spinner").should("not.exist");

    cy.url().should("eq", Cypress.config().baseUrl + "register");
  });
});

describe("3_Validación de la pantalla de registro", () => {
  beforeEach(() => {
    cy.visit("/register");
  });

  it("Debería mostrar los errores y mantener el botón deshabilitado cuando uno de los dos campos es inválido", () => {
    cy.get('[data-testid="email-form-field"] input').type("test@example.com");
    cy.get('[data-testid="password-form-field"] input').click();
    cy.get("body").click(0, 0);
    cy.get('[data-testid="password-form-field"]')
      .find("mat-error")
      .should("contain.text", "Password is")
      .and("contain.text", "required");

    cy.get('[data-testid="register-button"]').should("be.disabled");

    cy.get('[data-testid="email-form-field"] input').clear();
    cy.get('[data-testid="email-form-field"] input').click();
    cy.get("body").click(0, 0);
    cy.get('[data-testid="password-form-field"] input').type("validpassword");
    cy.get('[data-testid="email-form-field"]')
      .find("mat-error")
      .should("contain.text", "Email is")
      .and("contain.text", "required");

    cy.get('[data-testid="password-form-field"]')
      .find("mat-error")
      .should("not.exist");

    cy.get('[data-testid="register-button"]').should("be.disabled");
  });
});
