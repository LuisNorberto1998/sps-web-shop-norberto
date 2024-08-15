describe("Test para visitar página", () => {
  it("Visitar", () => {
    cy.visit("/");
  });
});

describe("1_Validación de la pantalla de Login", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("debería mantener el botón deshabilitado cuando el formulario es inválido y manejar la navegación correctamente", () => {
    cy.get('button[type="submit"]').should("be.disabled");
    cy.get('button[type="submit"]').click({ force: true });
    cy.get("mat-spinner").should("not.exist");
    cy.url().should("eq", Cypress.config().baseUrl + "login");
  });
});

describe("2_Validación de la pantalla de Login", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("debería mostrar mensajes de error cuando los campos están vacíos y mantener el botón deshabilitado", () => {
    cy.get('[data-testid="email-form-field"] input').focus().blur();
    cy.get('[data-testid="email-form-field"]')
      .find("mat-error")
      .should("contain.text", "Email es")
      .and("contain.text", "obligatorio");

    cy.get('[data-testid="password-form-field"] input').focus().blur();
    cy.get('[data-testid="password-form-field"]')
      .find("mat-error")
      .should("contain.text", "Contraseña es")
      .and("contain.text", "obligatoria");

    cy.get('[data-testid="login-button"]').click({ force: true });

    cy.get("mat-spinner").should("not.exist");

    cy.url().should("eq", Cypress.config().baseUrl + "login");
  });
});

describe("3_Validación de la pantalla de Login", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Debería mostrar los errores y mantener el botón deshabilitado cuando uno de los dos campos son invalidos", () => {
    cy.get('[data-testid="email-form-field"] input').type("test@example.com");
    cy.get('[data-testid="password-form-field"] input').click();
    cy.get("body").click(0, 0);
    cy.get('[data-testid="password-form-field"]')
      .find("mat-error")
      .should("contain.text", "Contraseña es")
      .and("contain.text", "obligatoria");

    cy.get('[data-testid="login-button"]').should("be.disabled");

    cy.get('[data-testid="email-form-field"] input').clear();
    cy.get('[data-testid="email-form-field"] input').click();
    cy.get("body").click(0, 0);
    cy.get('[data-testid="password-form-field"] input').type("validpassword");
    cy.get('[data-testid="email-form-field"]')
      .find("mat-error")
      .should("contain.text", "Email es")
      .and("contain.text", "obligatorio");

    cy.get('[data-testid="password-form-field"]')
      .find("mat-error")
      .should("not.exist");

    cy.get('[data-testid="login-button"]').should("be.disabled");
  });
});

describe("4_Validación de login con credenciales válidas", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("debería iniciar sesión correctamente con el correo y contraseña válidos para después cerrar sesión con el botón de logout", () => {
    cy.get('[data-testid="email-form-field"] input').type("cuenta@gmail.com");

    cy.get('[data-testid="password-form-field"] input').type("Zodiaco123");
    cy.get('[data-testid="login-button"]').click();
    cy.get("mat-spinner").should("not.exist");
    cy.get("mat-snack-bar-container")
      .should("be.visible")
      .and("contain.text", "Sesión iniciada con éxito");

    cy.url().should("eq", Cypress.config().baseUrl + "dashboard");
    cy.get('[data-testid="logout-button"]').should("be.visible");
    cy.get('[data-testid="logout-button"]').click();
    cy.get("mat-spinner").should("not.exist");

    cy.get("mat-snack-bar-container")
      .should("be.visible")
      .and("contain.text", "Sesión cerrada con éxito");

    cy.url().should("eq", Cypress.config().baseUrl + "login");
  });
});
