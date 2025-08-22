/// <reference types="cypress"/>
import '../../support/commands';

describe('Page des CNVs d\'un patient - Ordre des facettes', () => {
  let epCHUSJ_ldmCHUSJ: any;
  const setupTest = () => {
    epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
  };

  it('Gène - Cytobande', () => {
    setupTest();
    cy.openFacet('Gène', 'Cytobande');
    cy.validateFacetRank(0, 'Cytobande');
  });

  it('Gène - Panel RQDM', () => {
    setupTest();
    cy.openFacet('Gène', 'Panel RQDM');
    cy.validateFacetRank(1, 'Panel RQDM');
  });

  it('Gène - HPO', () => {
    setupTest();
    cy.openFacet('Gène', 'HPO');
    cy.validateFacetRank(2, 'HPO');
  });

  it('Gène - ORPHANET', () => {
    setupTest();
    cy.openFacet('Gène', 'ORPHANET');
    cy.validateFacetRank(3, 'ORPHANET');
  });

  it('Gène - OMIM', () => {
    setupTest();
    cy.openFacet('Gène', 'OMIM');
    cy.validateFacetRank(4, 'OMIM');
  });

  it('Gène - DDD', () => {
    setupTest();
    cy.openFacet('Gène', 'DDD');
    cy.validateFacetRank(5, 'DDD');
  });

  it('Gène - COSMIC', () => {
    setupTest();
    cy.openFacet('Gène', 'COSMIC');
    cy.validateFacetRank(6, 'COSMIC');
  });
});
