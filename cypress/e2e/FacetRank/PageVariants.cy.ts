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

  it('Pathogénicité - Score Exomiser (max)', () => {
    cy.openFacet('Pathogénicité', 'Score Exomiser (max)');
    cy.validateFacetRank(1, 'Score Exomiser (max)');
  });

  it('Pathogénicité - ACMG de Exomiser (max)', () => {
    cy.openFacet('Pathogénicité', 'ACMG de Exomiser (max)');
    cy.validateFacetRank(2, 'ACMG de Exomiser (max)');
  });

  it('Pathogénicité - Critères ACMG de Exomiser (max)', () => {
    cy.openFacet('Pathogénicité', 'Critères ACMG de Exomiser (max)');
    cy.validateFacetRank(3, 'Critères ACMG de Exomiser (max)');
  });

  it('Pathogénicité - Score Franklin (max)', () => {
    cy.openFacet('Pathogénicité', 'Score Franklin (max)');
    cy.validateFacetRank(6, 'Score Franklin (max)');
  });
});
