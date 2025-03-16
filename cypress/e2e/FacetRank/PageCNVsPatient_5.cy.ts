/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
});

describe('Page des CNVs d\'un patient - Ordre des facettes', () => {
  it('Occurrence - Origine parentale', () => {
    cy.openFacet('Occurrence', 'Origine parentale');
    cy.validateFacetRank(0, 'Origine parentale');
  });

  it('Occurrence - Transmission', () => {
    cy.openFacet('Occurrence', 'Transmission');
    cy.validateFacetRank(1, 'Transmission');
  });

  it('Occurrence - Filtre', () => {
    cy.openFacet('Occurrence', 'Filtre');
    cy.validateFacetRank(2, 'Filtre');
  });

  it('Occurrence - Qualité du CNV', () => {
    cy.openFacet('Occurrence', 'Qualité du CNV');
    cy.validateFacetRank(3, 'Qualité du CNV');
  });
});
