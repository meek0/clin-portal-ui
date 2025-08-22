/// <reference types="cypress"/>
import '../../support/commands';

describe('Page des variants - Valider les liens disponibles', () => {
  const setupTest = () => {
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitVariantsPage();
  };

  it('Patient - Expand all/Collapse all', () => {
    setupTest();
    cy.validateExpandCollapse('Patient');
  });
});
