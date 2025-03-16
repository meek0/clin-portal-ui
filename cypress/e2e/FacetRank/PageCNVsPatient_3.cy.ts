/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
});

describe('Page des CNVs d\'un patient - Ordre des facettes', () => {
  it('Gène - Panel RQDM', () => {
    cy.openFacet('Gène', 'Panel RQDM');
    cy.validateFacetRank(0, 'Panel RQDM');
  });

  it('Gène - HPO', () => {
    cy.openFacet('Gène', 'HPO');
    cy.validateFacetRank(1, 'HPO');
  });

  it('Gène - ORPHANET', () => {
    cy.openFacet('Gène', 'ORPHANET');
    cy.validateFacetRank(2, 'ORPHANET');
  });

  it('Gène - OMIM', () => {
    cy.openFacet('Gène', 'OMIM');
    cy.validateFacetRank(3, 'OMIM');
  });

  it('Gène - DDD', () => {
    cy.openFacet('Gène', 'DDD');
    cy.validateFacetRank(4, 'DDD');
  });

  it('Gène - COSMIC', () => {
    cy.openFacet('Gène', 'COSMIC');
    cy.validateFacetRank(5, 'COSMIC');
  });
});
