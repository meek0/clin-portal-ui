/// <reference types="cypress"/>
import '../../support/commands';

describe('Page des variants d\'un patient (somatic) - Valider les liens disponibles', () => {
  let presc_SOMATIC: any;
  const setupTest = () => {
    presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitVariantsPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);
  };

  it('Variant - Expand all/Collapse all', () => {
    setupTest();
    cy.validateExpandCollapse('Variant');
  });
});
