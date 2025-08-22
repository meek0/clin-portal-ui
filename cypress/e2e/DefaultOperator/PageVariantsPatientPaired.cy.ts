/// <reference types="cypress"/>
import '../../support/commands';

describe('Page des variants d\'un patient (paired) - Opérateurs par défaut', () => {
  let presc_PAIRED: any;
  const setupTest = () => {
    presc_PAIRED = Cypress.env('globalData').presc_PAIRED;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitVariantsPairedPatientPage(presc_PAIRED.patientProbId, presc_PAIRED.prescriptionId.TEBA, 3);
  };

  it('Occurrence - Qualité somatique', () => {
    setupTest();
    cy.openFacet('Occurrence', 'Qualité somatique');
    cy.get(`[data-cy="InputNumber_Min_Qualité somatique"]`).should('exist');
    cy.get(`[data-cy="InputNumber_Max_Qualité somatique"]`).should('not.exist');
  });
});
