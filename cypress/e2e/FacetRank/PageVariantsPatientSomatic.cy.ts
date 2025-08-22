/// <reference types="cypress"/>
import '../../support/commands';

describe('Page des variants d\'un patient (somatic) - Ordre des facettes', () => {
  let presc_SOMATIC: any;
  const setupTest = () => {
    presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitVariantsPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);
  };

  it('Variant - Analyse bioinformatique', () => {
    setupTest();
    cy.openFacet('Variant', 'Analyse bioinformatique');
    cy.validateFacetRank(1, 'Analyse bioinformatique');
  });

  it('Pathogénicité - Hotspot', () => {
    setupTest();
    cy.openFacet('Pathogénicité', 'Hotspot');
    cy.validateFacetRank(14, 'Hotspot');
  });

  it('Occurrence - Qualité somatique', () => {
    setupTest();
    cy.openFacet('Occurrence', 'Qualité somatique');
    cy.validateFacetRank(7, 'Qualité somatique');
  });
});
