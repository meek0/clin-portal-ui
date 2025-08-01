/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
});

describe('Page des variants d\'un patient - Ordre des facettes', () => {
  it('Occurrence - Nombre de CNVs', () => {
    cy.openFacet('Occurrence', 'Nombre de CNVs');
    cy.validateFacetRank(0, 'Nombre de CNVs');
  });

  it('Occurrence - Zygosité', () => {
    cy.openFacet('Occurrence', 'Zygosité');
    cy.validateFacetRank(1, 'Zygosité');
  });

  it('Occurrence - Zygosité maternelle', () => {
    cy.openFacet('Occurrence', 'Zygosité maternelle');
    cy.validateFacetRank(2, 'Zygosité maternelle');
  });

  it('Occurrence - Zygosité paternelle', () => {
    cy.openFacet('Occurrence', 'Zygosité paternelle');
    cy.validateFacetRank(3, 'Zygosité paternelle');
  });

  it('Occurrence - Origine parentale', () => {
    cy.openFacet('Occurrence', 'Origine parentale');
    cy.validateFacetRank(4, 'Origine parentale');
  });

  it('Occurrence - Transmission', () => {
    cy.openFacet('Occurrence', 'Transmission');
    cy.validateFacetRank(5, 'Transmission');
  });

  it('Occurrence - Hét. composé', () => {
    cy.openFacet('Occurrence', 'Hét. composé');
    cy.validateFacetRank(6, 'Hét. composé');
  });

  it('Occurrence - Hét. composé potentiel', () => {
    cy.openFacet('Occurrence', 'Hét. composé potentiel');
    cy.validateFacetRank(7, 'Hét. composé potentiel');
  });

  it('Occurrence - Filtre', () => {
    cy.openFacet('Occurrence', 'Filtre');
    cy.validateFacetRank(8, 'Filtre');
  });

  it('Occurrence - Qualité de profondeur', () => {
    cy.openFacet('Occurrence', 'Qualité de profondeur');
    cy.validateFacetRank(9, 'Qualité de profondeur');
  });

  it('Occurrence - Profondeur allélique ALT', () => {
    cy.openFacet('Occurrence', 'Profondeur allélique ALT');
    cy.validateFacetRank(10, 'Profondeur allélique ALT');
  });

  it('Occurrence - Profondeur totale ALT + REF', () => {
    cy.openFacet('Occurrence', 'Profondeur totale ALT + REF');
    cy.validateFacetRank(11, 'Profondeur totale ALT + REF');
  });

  it('Occurrence - Ratio allélique ALT / (ALT+REF)', () => {
    cy.openFacet('Occurrence', 'Ratio allélique ALT / (ALT+REF)');
    cy.validateFacetRank(12, 'Ratio allélique ALT / (ALT+REF)');
  });

  it('Occurrence - Qualité du génotype', () => {
    cy.openFacet('Occurrence', 'Qualité du génotype');
    cy.validateFacetRank(13, 'Qualité du génotype');
  });
});
