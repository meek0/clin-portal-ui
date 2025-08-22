/// <reference types="cypress"/>
import '../../support/commands';

describe('Page des variants - Ordre des facettes', () => {
  const setupTest = () => {
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitVariantsPage();
  };

  it('Pathogénicité - Score Exomiser (max)', () => {
    setupTest();
    cy.openFacet('Pathogénicité', 'Score Exomiser (max)');
    cy.validateFacetRank(1, 'Score Exomiser (max)');
  });

  it('Pathogénicité - ACMG de Exomiser (max)', () => {
    setupTest();
    cy.openFacet('Pathogénicité', 'ACMG de Exomiser (max)');
    cy.validateFacetRank(2, 'ACMG de Exomiser (max)');
  });

  it('Pathogénicité - Critères ACMG de Exomiser (max)', () => {
    setupTest();
    cy.openFacet('Pathogénicité', 'Critères ACMG de Exomiser (max)');
    cy.validateFacetRank(3, 'Critères ACMG de Exomiser (max)');
  });

  it('Pathogénicité - Score Franklin (max)', () => {
    setupTest();
    cy.openFacet('Pathogénicité', 'Score Franklin (max)');
    cy.validateFacetRank(6, 'Score Franklin (max)');
  });
});
