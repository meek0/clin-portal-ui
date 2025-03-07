/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPage();
});

describe('Page des variants - Valider les liens disponibles', () => {
  it('Patient - Expand all/Collapse all', () => {
    cy.validateExpandCollapse('Patient');
  });
});
