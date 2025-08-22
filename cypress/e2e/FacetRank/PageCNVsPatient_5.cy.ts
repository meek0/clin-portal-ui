/// <reference types="cypress"/>
import '../../support/commands';

describe('Page des CNVs d\'un patient - Ordre des facettes', () => {
  let epCHUSJ_ldmCHUSJ: any;
  const setupTest = () => {
    epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
  };

  it('Pathogénicité - Score Exomiser', () => {
    setupTest();
    cy.openFacet('Pathogénicité', 'Score Exomiser');
    cy.validateFacetRank(0, 'Score Exomiser');
  });

  it('Pathogénicité - ACMG de Exomiser', () => {
    setupTest();
    cy.openFacet('Pathogénicité', 'ACMG de Exomiser');
    cy.validateFacetRank(1, 'ACMG de Exomiser');
  });
});
