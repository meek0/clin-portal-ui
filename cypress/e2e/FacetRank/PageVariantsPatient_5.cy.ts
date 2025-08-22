/// <reference types="cypress"/>
import '../../support/commands';

describe('Page des variants d\'un patient - Ordre des facettes', () => {
  let epCHUSJ_ldmCHUSJ: any;
  const setupTest = () => {
    epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
  };

  it('Pathogénicité - ClinVar', () => {
    setupTest();
    cy.openFacet('Pathogénicité', 'ClinVar');
    cy.validateFacetRank(0, 'ClinVar');
  });

  it('Pathogénicité - VEP', () => {
    setupTest();
    cy.openFacet('Pathogénicité', 'VEP');
    cy.validateFacetRank(1, 'VEP');
  });

  it('Pathogénicité - Score Exomiser', () => {
    setupTest();
    cy.openFacet('Pathogénicité', 'Score Exomiser');
    cy.validateFacetRank(2, 'Score Exomiser');
  });

  it('Pathogénicité - ACMG de Exomiser', () => {
    setupTest();
    cy.openFacet('Pathogénicité', 'ACMG de Exomiser');
    cy.validateFacetRank(3, 'ACMG de Exomiser');
  });

  it('Pathogénicité - Critères ACMG de Exomiser', () => {
    setupTest();
    cy.openFacet('Pathogénicité', 'Critères ACMG de Exomiser');
    cy.validateFacetRank(4, 'Critères ACMG de Exomiser');
  });

  it('Pathogénicité - Score Franklin', () => {
    setupTest();
    cy.openFacet('Pathogénicité', 'Score Franklin');
    cy.validateFacetRank(5, 'Score Franklin');
  });

  it('Pathogénicité - ACMG de Franklin', () => {
    setupTest();
    cy.openFacet('Pathogénicité', 'ACMG de Franklin');
    cy.validateFacetRank(6, 'ACMG de Franklin');
  });

  it('Pathogénicité - Critères ACMG de Franklin', () => {
    setupTest();
    cy.openFacet('Pathogénicité', 'Critères ACMG de Franklin');
    cy.validateFacetRank(7, 'Critères ACMG de Franklin');
  });

  it('Pathogénicité - CADD (Phred)', () => {
    setupTest();
    cy.openFacet('Pathogénicité', 'CADD (Phred)');
    cy.validateFacetRank(8, 'CADD (Phred)');
  });

  it('Pathogénicité - CADD (raw)', () => {
    setupTest();
    cy.openFacet('Pathogénicité', 'CADD (raw)');
    cy.validateFacetRank(9, 'CADD (raw)');
  });

  it('Pathogénicité - DANN', () => {
    setupTest();
    cy.openFacet('Pathogénicité', 'DANN');
    cy.validateFacetRank(10, 'DANN');
  });

  it('Pathogénicité - FATHMM', () => {
    setupTest();
    cy.openFacet('Pathogénicité', 'FATHMM');
    cy.validateFacetRank(11, 'FATHMM');
  });

  it('Pathogénicité - LRT', () => {
    setupTest();
    cy.openFacet('Pathogénicité', 'LRT');
    cy.validateFacetRank(12, 'LRT');
  });

  it('Pathogénicité - Polyphen 2 HVAR', () => {
    setupTest();
    cy.openFacet('Pathogénicité', 'Polyphen 2 HVAR');
    cy.validateFacetRank(13, 'Polyphen 2 HVAR');
  });

  it('Pathogénicité - SIFT', () => {
    setupTest();
    cy.openFacet('Pathogénicité', 'SIFT');
    cy.validateFacetRank(14, 'SIFT');
  });

  it('Pathogénicité - SpliceAI', () => {
    setupTest();
    cy.openFacet('Pathogénicité', 'SpliceAI');
    cy.validateFacetRank(15, 'SpliceAI');
  });

  it('Pathogénicité - REVEL', () => {
    setupTest();
    cy.openFacet('Pathogénicité', 'REVEL');
    cy.validateFacetRank(16, 'REVEL');
  });

  it('Pathogénicité - CMC', () => {
    setupTest();
    cy.openFacet('Pathogénicité', 'CMC');
    cy.validateFacetRank(17, 'CMC');
  });

  it('Pathogénicité - CMC (ratio)', () => {
    setupTest();
    cy.openFacet('Pathogénicité', 'CMC (ratio)');
    cy.validateFacetRank(18, 'CMC (ratio)');
  });

  it('Pathogénicité - CMC tier', () => {
    setupTest();
    cy.openFacet('Pathogénicité', 'CMC tier');
    cy.validateFacetRank(19, 'CMC tier');
  });
});
