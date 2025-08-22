/// <reference types="cypress"/>
import '../../support/commands';

describe('Page des variants d\'un patient - Ordre des facettes', () => {
  let epCHUSJ_ldmCHUSJ: any;
  const setupTest = () => {
    epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
  };

  it('Gène - Type de gène', () => {
    setupTest();
    cy.openFacet('Gène', 'Type de gène');
    cy.validateFacetRank(0, 'Type de gène');
  });

  it('Gène - Référence externe', () => {
    setupTest();
    cy.openFacet('Gène', 'Référence externe');
    cy.validateFacetRank(1, 'Référence externe');
  });

  it('Gène - gnomAD pLi', () => {
    setupTest();
    cy.openFacet('Gène', 'gnomAD pLi');
    cy.validateFacetRank(2, 'gnomAD pLi');
  });

  it('Gène - gnomAD LOEUF', () => {
    setupTest();
    cy.openFacet('Gène', 'gnomAD LOEUF');
    cy.validateFacetRank(3, 'gnomAD LOEUF');
  });

  it('Gène - OMIM (transmission)', () => {
    setupTest();
    cy.openFacet('Gène', 'OMIM (transmission)');
    cy.validateFacetRank(4, 'OMIM (transmission)');
  });

  it('Gène - RQDM', () => {
    setupTest();
    cy.openFacet('Gène', 'RQDM');
    cy.validateFacetRank(5, 'RQDM');
  });

  it('Gène - HPO', () => {
    setupTest();
    cy.openFacet('Gène', 'HPO');
    cy.validateFacetRank(6, 'HPO');
  });

  it('Gène - ORPHANET', () => {
    setupTest();
    cy.openFacet('Gène', 'ORPHANET');
    cy.validateFacetRank(7, 'ORPHANET');
  });

  it('Gène - OMIM', () => {
    setupTest();
    cy.openFacet('Gène', 'OMIM');
    cy.validateFacetRank(8, 'OMIM');
  });

  it('Gène - DDD', () => {
    setupTest();
    cy.openFacet('Gène', 'DDD');
    cy.validateFacetRank(9, 'DDD');
  });

  it('Gène - COSMIC', () => {
    setupTest();
    cy.openFacet('Gène', 'COSMIC');
    cy.validateFacetRank(10, 'COSMIC');
  });
});
