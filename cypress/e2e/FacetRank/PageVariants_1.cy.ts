/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPage();
});

describe('Page des variants - Ordre des facettes', () => {
  it('Patient - Analyse', () => {
    cy.openFacet('Patient', 'Analyse');
    cy.validateFacetRank(0, 'Analyse');
  });

  it('Patient - Statut clinique', () => {
    cy.openFacet('Patient', 'Statut clinique');
    cy.validateFacetRank(1, 'Statut clinique');
  });

  it('Patient - Sexe', () => {
    cy.openFacet('Patient', 'Sexe');
    cy.validateFacetRank(2, 'Sexe');
  });
});
