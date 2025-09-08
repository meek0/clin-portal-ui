/// <reference types="cypress"/>
import '../../support/commands';

describe('Page des CNVs d\'un patient - Ordre des facettes', () => {
  let epCHUSJ_ldmCHUSJ: any;
  const setupTest = () => {
    epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
  };

  it('Fréquence - Fréq. CNV TO tous les patients', () => {
    setupTest();
    cy.openFacet('Fréquence', 'Fréq. CNV TO tous les patients');
    cy.validateFacetRank(0, 'Fréq. CNV TO tous les patients');
  });

  it('Fréquence - Fréq. CNV tous les patients', () => {
    setupTest();
    cy.openFacet('Fréquence', 'Fréq. CNV tous les patients');
    cy.validateFacetRank(1, 'Fréq. CNV tous les patients');
  });

  it('Fréquence - Fréq. CNV patients atteints', () => {
    setupTest();
    cy.openFacet('Fréquence', 'Fréq. CNV patients atteints');
    cy.validateFacetRank(2, 'Fréq. CNV patients atteints');
  });

  it('Fréquence - Fréq. CNV patients non atteints', () => {
    setupTest();
    cy.openFacet('Fréquence', 'Fréq. CNV patients non atteints');
    cy.validateFacetRank(3, 'Fréq. CNV patients non atteints');
  });

  it('Fréquence - gnomAD 4.1.0', () => {
    setupTest();
    cy.openFacet('Fréquence', 'gnomAD 4.1.0');
    cy.validateFacetRank(4, 'gnomAD 4.1.0');
  });

  it('Fréquence - gnomAD 4.1.0 ALT', () => {
    setupTest();
    cy.openFacet('Fréquence', 'gnomAD 4.1.0 ALT');
    cy.validateFacetRank(5, 'gnomAD 4.1.0 ALT');
  });
});
