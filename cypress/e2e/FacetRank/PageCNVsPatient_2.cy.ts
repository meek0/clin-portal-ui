/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
});

describe('Page des CNVs d\'un patient - Ordre des facettes', () => {
  it('Variant - Type de variant', () => {
    cy.openFacet('Variant', 'Type de variant');
    cy.validateFacetRank(0, 'Type de variant');
  });

  it('Variant - Longueur du CNV', () => {
    cy.openFacet('Variant', 'Longueur du CNV');
    cy.validateFacetRank(1, 'Longueur du CNV');
  });

  it('Variant - Chromosome', () => {
    cy.openFacet('Variant', 'Chromosome');
    cy.validateFacetRank(2, 'Chromosome');
  });

  it('Variant - Début du CNV', () => {
    cy.openFacet('Variant', 'Début du CNV');
    cy.validateFacetRank(3, 'Début du CNV');
  });

  it('Variant - Fin du CNV', () => {
    cy.openFacet('Variant', 'Fin du CNV');
    cy.validateFacetRank(4, 'Fin du CNV');
  });
});
