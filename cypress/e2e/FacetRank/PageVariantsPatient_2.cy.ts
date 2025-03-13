/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
});

describe('Page des variants d\'un patient - Ordre des facettes', () => {
  it('Variant - Type de variant', () => {
    cy.openFacet('Variant', 'Type de variant');
    cy.validateFacetRank(0, 'Type de variant');
  });

  it('Variant - Conséquences', () => {
    cy.openFacet('Variant', 'Conséquences');
    cy.validateFacetRank(1, 'Conséquences');
  });

  it('Variant - Référence externe', () => {
    cy.openFacet('Variant', 'Référence externe');
    cy.validateFacetRank(2, 'Référence externe');
  });

  it('Variant - Chromosome', () => {
    cy.openFacet('Variant', 'Chromosome');
    cy.validateFacetRank(3, 'Chromosome');
  });

  it('Variant - Position', () => {
    cy.openFacet('Variant', 'Position');
    cy.validateFacetRank(4, 'Position');
  });
});
