/// <reference types="cypress"/>
import '../../support/commands';

describe('Page des CNVs d\'un patient - Ordre des facettes', () => {
  let epCHUSJ_ldmCHUSJ: any;
  const setupTest = () => {
    epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
  };

  it('Analyse parentale - Origine parentale', () => {
    setupTest();
    cy.openFacet('Analyse parentale', 'Origine parentale');
    cy.validateFacetRank(0, 'Origine parentale');
  });

  it('Analyse parentale - Transmission', () => {
    setupTest();
    cy.openFacet('Analyse parentale', 'Transmission');
    cy.validateFacetRank(1, 'Transmission');
  });
});
