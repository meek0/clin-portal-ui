/// <reference types="cypress"/>
import '../../support/commands';

let presc_PAIRED: any;

beforeEach(() => {
  presc_PAIRED = Cypress.env('globalData').presc_PAIRED;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPairedPatientPage(presc_PAIRED.patientProbId, presc_PAIRED.prescriptionId.TEBA, 3);
});

describe('Page des variants d\'un patient (paired) - Valider les liens disponibles', () => {
  it('Variant - Expand all/Collapse all', () => {
    cy.validateExpandCollapse('Variant');
  });
});
