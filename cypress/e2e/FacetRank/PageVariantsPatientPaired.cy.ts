/// <reference types="cypress"/>
import '../../support/commands';

describe('Page des variants d\'un patient (paired) - Ordre des facettes', () => {
  let presc_PAIRED: any;
  const setupTest = () => {
    presc_PAIRED = Cypress.env('globalData').presc_PAIRED;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitVariantsPairedPatientPage(presc_PAIRED.patientProbId, presc_PAIRED.prescriptionId.TEBA, 3);
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
    cy.validateFacetRank(6, 'Qualité somatique');
  });
});
