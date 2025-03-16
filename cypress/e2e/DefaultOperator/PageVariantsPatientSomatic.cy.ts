/// <reference types="cypress"/>
import '../../support/commands';

let presc_SOMATIC: any;

beforeEach(() => {
  presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);
});

describe('Page des variants d\'un patient (somatic) - Opérateurs par défaut', () => {
  it('Occurrence - Qualité somatique', () => {
    cy.openFacet('Occurrence', 'Qualité somatique');
    cy.get(`[data-cy="InputNumber_Min_Qualité somatique"]`).should('exist');
    cy.get(`[data-cy="InputNumber_Max_Qualité somatique"]`).should('not.exist');
  });
});
