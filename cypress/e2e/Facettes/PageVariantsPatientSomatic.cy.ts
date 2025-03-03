/// <reference types="cypress"/>
import '../../support/commands';

let presc_SOMATIC: any;

beforeEach(() => {
  presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);
});

describe('Page des variants d\'un patient (somatic) - Filtrer avec les facettes', () => {
  it('Variant - Expand all/Collapse all', () => {
    cy.validateExpandCollapse('Variant');
  });

  it('Variant - Analyse bioinformatique', () => {
    cy.validateFacetFilter('Variant', 'Analyse bioinformatique', 'TO', 'TO', /^195 065$/);
    cy.validateFacetRank(1, 'Analyse bioinformatique');
  });

  it('Pathogénicité - Hotspot', () => {
    cy.validateFacetFilter('Pathogénicité', 'Hotspot', 'True', 'true', /^27$/);
    cy.validateFacetRank(14, 'Hotspot');
  });

  it('Occurrence - Qualité somatique', () => {
    cy.validateFacetNumFilter('Min', 'Occurrence', 'Qualité somatique', '0.01', /^183 200$/);
    cy.validateFacetRank(6, 'Qualité somatique');
  });
});
