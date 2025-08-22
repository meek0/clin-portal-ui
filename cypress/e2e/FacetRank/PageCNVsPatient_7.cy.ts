/// <reference types="cypress"/>
import '../../support/commands';

describe('Page des CNVs d\'un patient - Ordre des facettes', () => {
  let epCHUSJ_ldmCHUSJ: any;
  const setupTest = () => {
    epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
  };

  it('Métrique CQ - Filtre', () => {
    setupTest();
    cy.openFacet('Métrique CQ', 'Filtre');
    cy.validateFacetRank(0, 'Filtre');
  });

  it('Métrique CQ - Qualité du CNV', () => {
    setupTest();
    cy.openFacet('Métrique CQ', 'Qualité du CNV');
    cy.validateFacetRank(1, 'Qualité du CNV');
  });

  it('Métrique CQ - PE', () => {
    setupTest();
    cy.openFacet('Métrique CQ', 'PE');
    cy.validateFacetRank(2, 'PE');
  });

  it('Métrique CQ - SM', () => {
    setupTest();
    cy.openFacet('Métrique CQ', 'SM');
    cy.validateFacetRank(3, 'SM');
  });
});
