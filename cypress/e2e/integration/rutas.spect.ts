describe('Validación de rutas', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('Debe de iniciar sesión y validar las rutas, posteriormente cerrar sesión y validar las rutas protegidas', () => {
    cy.get('[data-testid="email-form-field"] input').type('cuenta@gmail.com');
    cy.get('[data-testid="password-form-field"] input').type('Zodiaco123');
    cy.get('[data-testid="login-button"]').click();

    cy.get('mat-spinner').should('not.exist');

    cy.get('mat-snack-bar-container')
      .should('be.visible')
      .and('contain.text', 'Sesión iniciada con éxito');

    cy.url().should('eq', Cypress.config().baseUrl + 'dashboard');

    cy.visit('/product?id=1');
    cy.get('app-product-detail').should('exist');

    cy.visit('/cart');
    cy.get('app-cart').should('exist');

    cy.visit('/dashboard');
    cy.get('app-dashboard').should('exist');

    cy.visit('/unknown-route');
    cy.get('app-not-found').should('exist');

    cy.visit('/dashboard');
    cy.get('app-dashboard').should('exist');

    cy.get('[data-testid="logout-button"]').should('be.visible');
    cy.get('[data-testid="logout-button"]').click();
    cy.get('mat-spinner').should('not.exist');

    cy.get('mat-snack-bar-container')
      .should('be.visible')
      .and('contain.text', 'Sesión cerrada con éxito');

    cy.url().should('eq', Cypress.config().baseUrl + 'login');

    cy.visit('/product');
    cy.url().should('eq', Cypress.config().baseUrl + 'login');

    cy.visit('/cart');
    cy.url().should('eq', Cypress.config().baseUrl + 'login');

    cy.visit('/dashboard');
    cy.url().should('eq', Cypress.config().baseUrl + 'login');
  });
});
