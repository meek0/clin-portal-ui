/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
});

describe('Page des variants d\'un patient - Ordre des facettes', () => {
  it('Gène - Type de gène', () => {
    cy.openFacet('Gène', 'Type de gène');
    cy.validateFacetRank(0, 'Type de gène');
  });

  it('Gène - Référence externe', () => {
    cy.openFacet('Gène', 'Référence externe');
    cy.validateFacetRank(1, 'Référence externe');
  });

  it('Gène - gnomAD pLi', () => {
    cy.openFacet('Gène', 'gnomAD pLi');
    cy.validateFacetRank(2, 'gnomAD pLi');
  });

  it('Gène - gnomAD LOEUF', () => {
    cy.openFacet('Gène', 'gnomAD LOEUF');
    cy.validateFacetRank(3, 'gnomAD LOEUF');
  });

  it('Gène - OMIM (transmission)', () => {
    cy.openFacet('Gène', 'OMIM (transmission)');
    cy.validateFacetRank(4, 'OMIM (transmission)');
  });

  it('Gène - RQDM', () => {
    cy.openFacet('Gène', 'RQDM');
    cy.validateFacetRank(5, 'RQDM');
  });

  it('Gène - HPO', () => {
    cy.openFacet('Gène', 'HPO');
    cy.validateFacetRank(6, 'HPO');
  });

  it('Gène - ORPHANET', () => {
    cy.openFacet('Gène', 'ORPHANET');
    cy.validateFacetRank(7, 'ORPHANET');
  });

  it('Gène - OMIM', () => {
    cy.openFacet('Gène', 'OMIM');
    cy.validateFacetRank(8, 'OMIM');
  });

  it('Gène - DDD', () => {
    cy.openFacet('Gène', 'DDD');
    cy.validateFacetRank(9, 'DDD');
  });

  it('Gène - COSMIC', () => {
    cy.openFacet('Gène', 'COSMIC');
    cy.validateFacetRank(10, 'COSMIC');
  });
});
