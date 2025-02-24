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

  it('Fréquence - Fréq. all. tous les patients', () => {
    cy.validateFacetNumFilter('Max', 'Fréquence', 'Fréq. all. tous les patients', '0.01', /^(8 70\d{1}|11 569)$/);
    cy.validateFacetRank(0, 'Fréq. all. tous les patients');
  });

  it('Fréquence - Fréq. all. patients atteints', () => {
    cy.validateFacetNumFilter('Min', 'Fréquence', 'Fréq. all. patients atteints', '0.01', /^174 988$/);
    cy.validateFacetRank(1, 'Fréq. all. patients atteints');
  });

  it('Fréquence - Fréq. all. patients non atteints', () => {
    cy.validateFacetNumFilter('Max', 'Fréquence', 'Fréq. all. patients non atteints', '0.01', /^18 3\d{2}$/);
    cy.validateFacetRank(2, 'Fréq. all. patients non atteints');
  });

  it('Fréquence - gnomAD Exome 2.1.1', () => {
    cy.validateFacetNumFilter('Max', 'Fréquence', 'gnomAD Exome 2.1.1', '0.01', /^134 845$/);
    cy.validateFacetRank(3, 'gnomAD Exome 2.1.1');
  });

  it('Fréquence - gnomAD Genome 2.1.1', () => {
    cy.validateFacetNumFilter('Max', 'Fréquence', 'gnomAD Genome 2.1.1', '0.01', /^16 466$/);
    cy.validateFacetRank(4, 'gnomAD Genome 2.1.1');
  });

  it('Fréquence - gnomAD Genome 3.0', () => {
    cy.validateFacetNumFilter('Max', 'Fréquence', 'gnomAD Genome 3.0', '0.01', /^8 829$/);
    cy.validateFacetRank(5, 'gnomAD Genome 3.0');
  });

  it('Fréquence - gnomAD Genome 3.1.1', () => {
    cy.validateFacetNumFilter('Max', 'Fréquence', 'gnomAD Genome 3.1.1', '0.01', /^8 854$/);
    cy.validateFacetRank(6, 'gnomAD Genome 3.1.1');
  });

  it('Fréquence - gnomAD Genome 3.1.1 ALT', () => {
    cy.validateFacetNumFilter('Max', 'Fréquence', 'gnomAD Genome 3.1.1 ALT', '0.01', /^1 378$/);
    cy.validateFacetRank(7, 'gnomAD Genome 3.1.1 ALT');
  });

  it('Fréquence - gnomAD Genome 4.1.0', () => {
    cy.validateFacetNumFilter('Max', 'Fréquence', 'gnomAD Genome 4.1.0', '0.01', /^8 850$/);
    cy.validateFacetRank(8, 'gnomAD Genome 4.1.0');
  });

  it('Fréquence - gnomAD Genome 4.1.0 ALT', () => {
    cy.validateFacetNumFilter('Max', 'Fréquence', 'gnomAD Genome 4.1.0 ALT', '0.01', /^1 378$/);
    cy.validateFacetRank(9, 'gnomAD Genome 4.1.0 ALT');
  });

  it('Fréquence - TopMed Bravo', () => {
    cy.validateFacetNumFilter('Max', 'Fréquence', 'TopMed Bravo', '0.01', /^8 881$/);
    cy.validateFacetRank(10, 'TopMed Bravo');
  });

  it('Fréquence - 1000 Genome', () => {
    cy.validateFacetNumFilter('Max', 'Fréquence', '1000 Genome', '0.01', /^182 677$/);
    cy.validateFacetRank(11, '1000 Genome');
  });
});
