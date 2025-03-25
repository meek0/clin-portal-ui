/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
});

describe('Page des variants d\'un patient - Opérateurs par défaut', () => {
  it('Fréquence - Fréq. all. tous les patients', () => {
    cy.openFacet('Fréquence', 'Fréq. all. tous les patients');
    cy.get(`[data-cy="InputNumber_Min_Fréq. all. tous les patients"]`).should('not.exist');
    cy.get(`[data-cy="InputNumber_Max_Fréq. all. tous les patients"]`).should('exist');
  });

  it('Fréquence - Fréq. all. patients atteints', () => {
    cy.openFacet('Fréquence', 'Fréq. all. patients atteints');
    cy.get(`[data-cy="InputNumber_Min_Fréq. all. patients atteints"]`).should('exist');
    cy.get(`[data-cy="InputNumber_Max_Fréq. all. patients atteints"]`).should('not.exist');
  });

  it('Fréquence - Fréq. all. patients non atteints', () => {
    cy.openFacet('Fréquence', 'Fréq. all. patients non atteints');
    cy.get(`[data-cy="InputNumber_Min_Fréq. all. patients non atteints"]`).should('not.exist');
    cy.get(`[data-cy="InputNumber_Max_Fréq. all. patients non atteints"]`).should('exist');
  });

  it('Fréquence - gnomAD Exome 2.1.1', () => {
    cy.openFacet('Fréquence', 'gnomAD Exome 2.1.1');
    cy.get(`[data-cy="InputNumber_Min_gnomAD Exome 2.1.1"]`).should('not.exist');
    cy.get(`[data-cy="InputNumber_Max_gnomAD Exome 2.1.1"]`).should('exist');
  });

  it('Fréquence - gnomAD Genome 2.1.1', () => {
    cy.openFacet('Fréquence', 'gnomAD Genome 2.1.1');
    cy.get(`[data-cy="InputNumber_Min_gnomAD Genome 2.1.1"]`).should('not.exist');
    cy.get(`[data-cy="InputNumber_Max_gnomAD Genome 2.1.1"]`).should('exist');
  });

  it('Fréquence - gnomAD Genome 3.0', () => {
    cy.openFacet('Fréquence', 'gnomAD Genome 3.0');
    cy.get(`[data-cy="InputNumber_Min_gnomAD Genome 3.0"]`).should('not.exist');
    cy.get(`[data-cy="InputNumber_Max_gnomAD Genome 3.0"]`).should('exist');
  });

  it('Fréquence - gnomAD Genome 3.1.1', () => {
    cy.openFacet('Fréquence', 'gnomAD Genome 3.1.1');
    cy.get(`[data-cy="InputNumber_Min_gnomAD Genome 3.1.1"]`).should('not.exist');
    cy.get(`[data-cy="InputNumber_Max_gnomAD Genome 3.1.1"]`).should('exist');
  });

  it('Fréquence - gnomAD Genome 3.1.1 ALT', () => {
    cy.openFacet('Fréquence', 'gnomAD Genome 3.1.1 ALT');
    cy.get(`[data-cy="InputNumber_Min_gnomAD Genome 3.1.1 ALT"]`).should('not.exist');
    cy.get(`[data-cy="InputNumber_Max_gnomAD Genome 3.1.1 ALT"]`).should('exist');
  });

  it('Fréquence - gnomAD 4.1.0', () => {
    cy.openFacet('Fréquence', 'gnomAD 4.1.0');
    cy.get(`[data-cy="InputNumber_Min_gnomAD 4.1.0"]`).should('not.exist');
    cy.get(`[data-cy="InputNumber_Max_gnomAD 4.1.0"]`).should('exist');
  });

  it('Fréquence - gnomAD 4.1.0 ALT', () => {
    cy.openFacet('Fréquence', 'gnomAD 4.1.0 ALT');
    cy.get(`[data-cy="InputNumber_Min_gnomAD 4.1.0 ALT"]`).should('not.exist');
    cy.get(`[data-cy="InputNumber_Max_gnomAD 4.1.0 ALT"]`).should('exist');
  });

  it('Fréquence - TopMed Bravo', () => {
    cy.openFacet('Fréquence', 'TopMed Bravo');
    cy.get(`[data-cy="InputNumber_Min_TopMed Bravo"]`).should('not.exist');
    cy.get(`[data-cy="InputNumber_Max_TopMed Bravo"]`).should('exist');
  });

  it('Fréquence - 1000 Genome', () => {
    cy.openFacet('Fréquence', '1000 Genome');
    cy.get(`[data-cy="InputNumber_Min_1000 Genome"]`).should('not.exist');
    cy.get(`[data-cy="InputNumber_Max_1000 Genome"]`).should('exist');
  });
});
