/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
});

describe('Page des variants d\'un patient - Ordre des facettes', () => {
  it('Fréquence - Fréq. all. tous les patients', () => {
    cy.openFacet('Fréquence', 'Fréq. all. tous les patients');
    cy.validateFacetRank(0, 'Fréq. all. tous les patients');
  });

  it('Fréquence - Fréq. all. patients atteints', () => {
    cy.openFacet('Fréquence', 'Fréq. all. patients atteints');
    cy.validateFacetRank(1, 'Fréq. all. patients atteints');
  });

  it('Fréquence - Fréq. all. patients non atteints', () => {
    cy.openFacet('Fréquence', 'Fréq. all. patients non atteints');
    cy.validateFacetRank(2, 'Fréq. all. patients non atteints');
  });

  it('Fréquence - gnomAD Exome 2.1.1', () => {
    cy.openFacet('Fréquence', 'gnomAD Exome 2.1.1');
    cy.validateFacetRank(3, 'gnomAD Exome 2.1.1');
  });

  it('Fréquence - gnomAD Genome 2.1.1', () => {
    cy.openFacet('Fréquence', 'gnomAD Genome 2.1.1');
    cy.validateFacetRank(4, 'gnomAD Genome 2.1.1');
  });

  it('Fréquence - gnomAD Genome 3.0', () => {
    cy.openFacet('Fréquence', 'gnomAD Genome 3.0');
    cy.validateFacetRank(5, 'gnomAD Genome 3.0');
  });

  it('Fréquence - gnomAD Genome 3.1.1', () => {
    cy.openFacet('Fréquence', 'gnomAD Genome 3.1.1');
    cy.validateFacetRank(6, 'gnomAD Genome 3.1.1');
  });

  it('Fréquence - gnomAD Genome 3.1.1 ALT', () => {
    cy.openFacet('Fréquence', 'gnomAD Genome 3.1.1 ALT');
    cy.validateFacetRank(7, 'gnomAD Genome 3.1.1 ALT');
  });

  it('Fréquence - gnomAD 4.1.0', () => {
    cy.openFacet('Fréquence', 'gnomAD 4.1.0');
    cy.validateFacetRank(8, 'gnomAD 4.1.0');
  });

  it('Fréquence - gnomAD 4.1.0 ALT', () => {
    cy.openFacet('Fréquence', 'gnomAD 4.1.0 ALT');
    cy.validateFacetRank(9, 'gnomAD 4.1.0 ALT');
  });

  it('Fréquence - TopMed Bravo', () => {
    cy.openFacet('Fréquence', 'TopMed Bravo');
    cy.validateFacetRank(10, 'TopMed Bravo');
  });

  it('Fréquence - 1000 Genome', () => {
    cy.openFacet('Fréquence', '1000 Genome');
    cy.validateFacetRank(11, '1000 Genome');
  });
});
