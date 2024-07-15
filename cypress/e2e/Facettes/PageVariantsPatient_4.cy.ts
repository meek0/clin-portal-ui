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

  it('Fréquence - Fréq. all. tous les patients [CLIN-2954]', () => {
    cy.validateFacetNumFilter('Fréquence', 'Fréq. all. tous les patients', '0.01', /^(8 70\d{1}|11 569)$/);
    cy.validateFacetRank(0, 'Fréq. all. tous les patients');
  });

  it('Fréquence - Fréq. all. patients atteints [CLIN-2954]', () => {
    cy.validateFacetNumFilter('Fréquence', 'Fréq. all. patients atteints', '0.01', /^(9 0\d{2}|13 366)$/);
    cy.validateFacetRank(1, 'Fréq. all. patients atteints');
  });

  it('Fréquence - Fréq. all. patients non atteints', () => {
    cy.validateFacetNumFilter('Fréquence', 'Fréq. all. patients non atteints', '0.01', /^18 3\d{2}$/);
    cy.validateFacetRank(2, 'Fréq. all. patients non atteints');
  });

  it('Fréquence - gnomAD Exome 2.1.1 [CLIN-2954]', () => {
    cy.validateFacetNumFilter('Fréquence', 'gnomAD Exome 2.1.1', '0.01', /^134 845$/);
    cy.validateFacetRank(3, 'gnomAD Exome 2.1.1');
  });

  it('Fréquence - gnomAD Genome 2.1.1 [CLIN-2954]', () => {
    cy.validateFacetNumFilter('Fréquence', 'gnomAD Genome 2.1.1', '0.01', /^16 465$/);
    cy.validateFacetRank(4, 'gnomAD Genome 2.1.1');
  });

  it('Fréquence - gnomAD Genome 3.0 [CLIN-2954]', () => {
    cy.validateFacetNumFilter('Fréquence', 'gnomAD Genome 3.0', '0.01', /^8 829$/);
    cy.validateFacetRank(5, 'gnomAD Genome 3.0');
  });

  it('Fréquence - gnomAD Genome 3.1.1 [CLIN-2954]', () => {
    cy.validateFacetNumFilter('Fréquence', 'gnomAD Genome 3.1.1', '0.01', /^8 854$/);
    cy.validateFacetRank(6, 'gnomAD Genome 3.1.1');
  });

  it('Fréquence - gnomAD Genome 3.1.1 ALT [CLIN-2954]', () => {
    cy.validateFacetNumFilter('Fréquence', 'gnomAD Genome 3.1.1 ALT', '0.01', /^1 378$/);
    cy.validateFacetRank(7, 'gnomAD Genome 3.1.1 ALT');
  });

  it('Fréquence - TopMed Bravo [CLIN-2954]', () => {
    cy.validateFacetNumFilter('Fréquence', 'TopMed Bravo', '0.01', /^8 881$/);
    cy.validateFacetRank(8, 'TopMed Bravo');
  });

  it('Fréquence - 1000 Genome [CLIN-2954]', () => {
    cy.validateFacetNumFilter('Fréquence', '1000 Genome', '0.01', /^182 677$/);
    cy.validateFacetRank(9, '1000 Genome');
  });
});
