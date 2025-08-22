/// <reference types="cypress"/>
import '../../support/commands';

describe('Page des variants - Opérateurs par défaut', () => {
  const setupTest = () => {
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitVariantsPage();
  };

  it('Pathogénicité - Score Exomiser (max)', () => {
    setupTest();
    cy.openFacet('Pathogénicité', 'Score Exomiser (max)');
    cy.get(`[data-cy="InputNumber_Min_Score Exomiser (max)"]`).should('exist');
    cy.get(`[data-cy="InputNumber_Max_Score Exomiser (max)"]`).should('not.exist');
  });

  it('Pathogénicité - Score Franklin (max)', () => {
    setupTest();
    cy.openFacet('Pathogénicité', 'Score Franklin (max)');
    cy.get(`[data-cy="InputNumber_Min_Score Franklin (max)"]`).should('exist');
    cy.get(`[data-cy="InputNumber_Max_Score Franklin (max)"]`).should('not.exist');
  });
});
