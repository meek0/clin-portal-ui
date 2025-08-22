/// <reference types="cypress"/>
import '../../support/commands';

describe('Page des variants d\'un patient - Ordre des facettes', () => {
  let epCHUSJ_ldmCHUSJ: any;
  const setupTest = () => {
    epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
  };

  it('Panel RQDM - RQDM', () => {
    setupTest();
    cy.openFacet('Panel RQDM', 'RQDM');
    cy.validateFacetRank(0, 'RQDM');
  });
});
