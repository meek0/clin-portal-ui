/// <reference types="cypress"/>
import '../../support/commands';

let presc_PAIRED: any;

beforeEach(() => {
  presc_PAIRED = Cypress.env('globalData').presc_PAIRED;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPairedPatientPage(presc_PAIRED.patientProbId, presc_PAIRED.prescriptionId.TEBA, 3);
});

describe('Page des variants d\'un patient (paired) - Ordre des facettes', () => {
  it('Variant - Analyse bioinformatique', () => {
    cy.openFacet('Variant', 'Analyse bioinformatique');
    cy.validateFacetRank(1, 'Analyse bioinformatique');
  });

  it('Pathogénicité - Hotspot', () => {
    cy.openFacet('Pathogénicité', 'Hotspot');
    cy.validateFacetRank(14, 'Hotspot');
  });

  it('Occurrence - Qualité somatique', () => {
    cy.openFacet('Occurrence', 'Qualité somatique');
    cy.validateFacetRank(6, 'Qualité somatique');
  });
});
