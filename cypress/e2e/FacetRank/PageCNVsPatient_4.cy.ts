/// <reference types="cypress"/>
import '../../support/commands';

describe('Page des CNVs d\'un patient - Ordre des facettes', () => {
  let epCHUSJ_ldmCHUSJ: any;
  const setupTest = () => {
    epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
  };

  it('Fréquence - Fréq. CNV tous les patients', () => {
    setupTest();
    cy.openFacet('Fréquence', 'Fréq. CNV tous les patients');
    cy.validateFacetRank(0, 'Fréq. CNV tous les patients');
  });

  it('Fréquence - gnomAD 4.1.0', () => {
    setupTest();
    cy.openFacet('Fréquence', 'gnomAD 4.1.0');
    cy.validateFacetRank(1, 'gnomAD 4.1.0');
  });

  it('Fréquence - gnomAD 4.1.0 ALT', () => {
    setupTest();
    cy.openFacet('Fréquence', 'gnomAD 4.1.0 ALT');
    cy.validateFacetRank(2, 'gnomAD 4.1.0 ALT');
  });
});
