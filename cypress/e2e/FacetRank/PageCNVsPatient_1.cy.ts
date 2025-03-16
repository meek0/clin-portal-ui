/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
});

describe('Page des CNVs d\'un patient - Ordre des facettes', () => {
  it('Panel RQDM - Panel RQDM', () => {
    cy.openFacet('Panel RQDM', 'Panel RQDM');
    cy.validateFacetRank(0, 'Panel RQDM');
  });
});
