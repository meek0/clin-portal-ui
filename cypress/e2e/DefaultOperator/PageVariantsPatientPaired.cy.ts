/// <reference types="cypress"/>
import '../../support/commands';

let presc_PAIRED: any;

beforeEach(() => {
  presc_PAIRED = Cypress.env('globalData').presc_PAIRED;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPairedPatientPage(presc_PAIRED.patientProbId, presc_PAIRED.prescriptionId.TEBA, 3);
});

describe('Page des variants d\'un patient (paired) - Opérateurs par défaut', () => {
  it('Occurrence - Qualité somatique', () => {
    cy.openFacet('Occurrence', 'Qualité somatique');
    cy.get(`[data-cy="InputNumber_Min_Qualité somatique"]`).should('exist');
    cy.get(`[data-cy="InputNumber_Max_Qualité somatique"]`).should('not.exist');
  });
});
