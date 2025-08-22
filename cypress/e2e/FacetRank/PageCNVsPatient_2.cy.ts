/// <reference types="cypress"/>
import '../../support/commands';

describe('Page des CNVs d\'un patient - Ordre des facettes', () => {
  let epCHUSJ_ldmCHUSJ: any;
  const setupTest = () => {
    epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
  };

  it('Variant - Type de variant', () => {
    setupTest();
    cy.openFacet('Variant', 'Type de variant');
    cy.validateFacetRank(0, 'Type de variant');
  });

  it('Variant - Nombre de copies', () => {
    setupTest();
    cy.openFacet('Variant', 'Nombre de copies');
    cy.validateFacetRank(1, 'Nombre de copies');
  });

  it('Variant - Longueur du CNV', () => {
    setupTest();
    cy.openFacet('Variant', 'Longueur du CNV');
    cy.validateFacetRank(2, 'Longueur du CNV');
  });

  it('Variant - Chromosome', () => {
    setupTest();
    cy.openFacet('Variant', 'Chromosome');
    cy.validateFacetRank(3, 'Chromosome');
  });

  it('Variant - Début du CNV', () => {
    setupTest();
    cy.openFacet('Variant', 'Début du CNV');
    cy.validateFacetRank(4, 'Début du CNV');
  });

  it('Variant - Fin du CNV', () => {
    setupTest();
    cy.openFacet('Variant', 'Fin du CNV');
    cy.validateFacetRank(5, 'Fin du CNV');
  });

  it('Variant - Nombre de SNVs', () => {
    setupTest();
    cy.openFacet('Variant', 'Nombre de SNVs');
    cy.validateFacetRank(6, 'Nombre de SNVs');
  });
});
