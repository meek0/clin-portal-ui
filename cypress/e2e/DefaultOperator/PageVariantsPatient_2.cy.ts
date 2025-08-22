/// <reference types="cypress"/>
import '../../support/commands';

describe('Page des variants d\'un patient - Opérateurs par défaut', () => {
  let epCHUSJ_ldmCHUSJ: any;
  const setupTest = () => {
    epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
  };

  it('Gène - gnomAD pLi', () => {
    setupTest();
    cy.openFacet('Gène', 'gnomAD pLi');
    cy.get(`[data-cy="InputNumber_Min_gnomAD pLi"]`).should('exist');
    cy.get(`[data-cy="InputNumber_Max_gnomAD pLi"]`).should('not.exist');
  });

  it('Gène - gnomAD LOEUF', () => {
    setupTest();
    cy.openFacet('Gène', 'gnomAD LOEUF');
    cy.get(`[data-cy="InputNumber_Min_gnomAD LOEUF"]`).should('not.exist');
    cy.get(`[data-cy="InputNumber_Max_gnomAD LOEUF"]`).should('exist');
  });
});
