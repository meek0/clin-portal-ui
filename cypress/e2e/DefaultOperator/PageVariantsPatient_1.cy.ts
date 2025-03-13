/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
});

describe('Page des variants d\'un patient - Opérateurs par défaut', () => {
  it('Variant - Position', () => {
    cy.openFacet('Variant', 'Position');
    cy.get(`[data-cy="InputNumber_Min_Position"]`).should('exist');
    cy.get(`[data-cy="InputNumber_Max_Position"]`).should('exist');
  });
});
