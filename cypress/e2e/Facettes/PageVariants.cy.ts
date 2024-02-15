/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

describe('Page des variants - Filtrer avec les facettes', () => {

  beforeEach(() => {
    cy.visitVariantsPage();
  });

  it('Patient - Expand all/Collapse all', () => {
    cy.validateExpandCollapse('Patient');
  });

  it('Patient - Analyse', () => {
    cy.validateFacetFilter('Patient', 'Analyse', 'MYOC', 'MYOC', /^870 60\d{1}$/);
    cy.validateFacetRank(0, 'Analyse');
  });

  it('Patient - Statut clinique', () => {
    cy.validateFacetFilter('Patient', 'Statut clinique', 'Non atteint', 'not_affected', /^423 \d{3}$/);
    cy.validateFacetRank(1, 'Statut clinique');
  });

  it('Patient - Sexe', () => {
    cy.validateFacetFilter('Patient', 'Sexe', 'Indéterminé', 'unknown', /^192 10\d{1}$/);
    cy.validateFacetRank(2, 'Sexe');
  });

  it('Pathogénicité - Score Exomiser (max)', () => {
    cy.validateFacetNumFilter('Pathogénicité', 'Score Exomiser (max)', '0.01', '1 298 759');
    cy.validateFacetRank(1, 'Score Exomiser (max)');
  });

  it('Pathogénicité - ACMG de Exomiser (max)', () => {
    cy.validateFacetFilter('Pathogénicité', 'ACMG de Exomiser (max)', 'Uncertain Significance', 'UNCERTAIN_SIGNIFICANCE', /^15$/);
    cy.validateFacetRank(2, 'ACMG de Exomiser (max)');
  });

  it('Pathogénicité - Critères ACMG de Exomiser (max)', () => {
    cy.validateFacetFilter('Pathogénicité', 'Critères ACMG de Exomiser (max)', 'PP4', 'PP4', /^5$/);
    cy.validateFacetRank(3, 'Critères ACMG de Exomiser (max)');
  });

  it('Pathogénicité - Score Franklin (max)', () => {
    cy.validateFacetNumFilter('Pathogénicité', 'Score Franklin (max)', '0.01', /^1 298 772$/);
    cy.validateFacetRank(6, 'Score Franklin (max)');
  });
});
