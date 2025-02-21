/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

describe('Page des variants d\'un patient - Filtrer avec les facettes', () => {

  beforeEach(() => {
    cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
  });

  it('Occurrence - Expand all/Collapse all', () => {
    cy.validateExpandCollapse('Occurrence');
  });

  it('Occurrence - Zygosité', () => {
    cy.validateFacetFilter('Occurrence', 'Zygosité', 'HET', 'HET', /^107 569$/);
    cy.validateFacetRank(0, 'Zygosité');
  });

  it('Occurrence - Zygosité maternelle', () => {
    cy.validateFacetFilter('Occurrence', 'Zygosité maternelle', 'HOM', 'HOM', /^64 388$/);
    cy.validateFacetRank(1, 'Zygosité maternelle');
  });

  it('Occurrence - Zygosité paternelle', () => {
    cy.validateFacetFilter('Occurrence', 'Zygosité paternelle', 'UNK', 'UNK', /^240$/);
    cy.validateFacetRank(2, 'Zygosité paternelle');
  });

  it('Occurrence - Origine parentale', () => {
    cy.validateFacetFilter('Occurrence', 'Origine parentale', 'Father and Mother', 'both', /^59 407$/);
    cy.validateFacetRank(3, 'Origine parentale');
  });

  it('Occurrence - Transmission', () => {
    cy.validateFacetFilter('Occurrence', 'Transmission', 'Autosomal Dominant De Novo', 'autosomal_dominant_de_novo', /^2 773$/);
    cy.validateFacetRank(4, 'Transmission');
  });

  it('Occurrence - Hét. composé', () => {
    cy.validateFacetFilter('Occurrence', 'Hét. composé', 'False', 'false', /^183 029$/);
    cy.validateFacetRank(5, 'Hét. composé');
  });

  it('Occurrence - Hét. composé potentiel', () => {
    cy.validateFacetFilter('Occurrence', 'Hét. composé potentiel', 'True', 'true', /^4 486$/);
    cy.validateFacetRank(6, 'Hét. composé potentiel');
  });

  it('Occurrence - Filtre', () => {
    cy.validateFacetFilter('Occurrence', 'Filtre', 'DRAGENIndelHardQUAL', 'DRAGENIndelHardQUAL', /^66$/);
    cy.validateFacetRank(7, 'Filtre');
  });

  it('Occurrence - Qualité de profondeur', () => {
    cy.validateFacetNumFilter('Occurrence', 'Qualité de profondeur', '0.01', /^12$/);
    cy.validateFacetRank(8, 'Qualité de profondeur');
  });

  it('Occurrence - Profondeur allélique ALT', () => {
    cy.validateFacetNumFilter('Occurrence', 'Profondeur allélique ALT', '5', /^23 324$/);
    cy.validateFacetRank(9, 'Profondeur allélique ALT');
  });

  it('Occurrence - Profondeur totale ALT + REF', () => {
    cy.validateFacetNumFilter('Occurrence', 'Profondeur totale ALT + REF', '5', /^11 586$/);
    cy.validateFacetRank(10, 'Profondeur totale ALT + REF');
  });

  it('Occurrence - Ratio allélique ALT / (ALT+REF)', () => {
    cy.validateFacetNumFilter('Occurrence', 'Ratio allélique ALT / (ALT+REF)', '0.05', /^1$/);
    cy.validateFacetRank(11, 'Ratio allélique ALT / (ALT+REF)');
  });

  it('Occurrence - Qualité du génotype', () => {
    cy.validateFacetNumFilter('Occurrence', 'Qualité du génotype', '5', /^3 025$/);
    cy.validateFacetRank(12, 'Qualité du génotype');
  });
});
