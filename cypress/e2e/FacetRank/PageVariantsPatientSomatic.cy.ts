/// <reference types="cypress"/>
import '../../support/commands';

let presc_SOMATIC: any;

beforeEach(() => {
  presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);
});

describe('Page des variants d\'un patient (somatic) - Ordre des facettes', () => {
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
    cy.validateFacetRank(7, 'Qualité somatique');
  });
});
