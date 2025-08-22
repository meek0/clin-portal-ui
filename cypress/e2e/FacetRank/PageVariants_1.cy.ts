/// <reference types="cypress"/>
import '../../support/commands';

describe('Page des variants - Ordre des facettes', () => {
  const setupTest = () => {
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitVariantsPage();
  };

  it('Patient - Analyse', () => {
    setupTest();
    cy.openFacet('Patient', 'Analyse');
    cy.validateFacetRank(0, 'Analyse');
  });

  it('Patient - Statut clinique', () => {
    setupTest();
    cy.openFacet('Patient', 'Statut clinique');
    cy.validateFacetRank(1, 'Statut clinique');
  });

  it('Patient - Sexe', () => {
    setupTest();
    cy.openFacet('Patient', 'Sexe');
    cy.validateFacetRank(2, 'Sexe');
  });
});
