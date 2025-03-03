/// <reference types="cypress"/>
import '../../support/commands';

let presc_PAIRED: any;

beforeEach(() => {
  presc_PAIRED = Cypress.env('globalData').presc_PAIRED;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPairedPatientPage(presc_PAIRED.patientProbId, presc_PAIRED.prescriptionId.TEBA, 3);
});

describe('Page des variants d\'un patient (paired) - Filtrer avec les facettes', () => {
  it('Variant - Expand all/Collapse all', () => {
    cy.validateExpandCollapse('Variant');
  });

  it('Variant - Analyse bioinformatique', () => {
    cy.validateFacetFilter('Variant', 'Analyse bioinformatique', 'TO', 'TO', /^1 559$/);
    cy.validateFacetRank(1, 'Analyse bioinformatique');
  });

  it('Pathogénicité - Hotspot', () => {
    cy.validateFacetFilter('Pathogénicité', 'Hotspot', 'True', 'true', /^8$/);
    cy.validateFacetRank(14, 'Hotspot');
  });

  it('Occurrence - Qualité somatique', () => {
    cy.validateFacetNumFilter('Min', 'Occurrence', 'Qualité somatique', '0.01', /^5 951$/);
    cy.validateFacetRank(6, 'Qualité somatique');
  });
});
