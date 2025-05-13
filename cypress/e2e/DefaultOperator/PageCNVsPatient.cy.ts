/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
});

describe('Page des CNVs d\'un patient - Opérateurs par défaut', () => {
  it('Variant - Nombre de copies', () => {
    cy.openFacet('Variant', 'Nombre de copies');
    cy.get(`[data-cy="InputNumber_Min_Nombre de copies"]`).should('exist');
    cy.get(`[data-cy="InputNumber_Max_Nombre de copies"]`).should('not.exist');
  });

  it('Variant - Longueur du CNV', () => {
    cy.openFacet('Variant', 'Longueur du CNV');
    cy.get(`[data-cy="InputNumber_Min_Longueur du CNV"]`).should('exist');
    cy.get(`[data-cy="InputNumber_Max_Longueur du CNV"]`).should('not.exist');
  });

  it('Variant - Début du CNV', () => {
    cy.openFacet('Variant', 'Début du CNV');
    cy.get(`[data-cy="InputNumber_Min_Début du CNV"]`).should('exist');
    cy.get(`[data-cy="InputNumber_Max_Début du CNV"]`).should('not.exist');
  });

  it('Variant - Fin du CNV', () => {
    cy.openFacet('Variant', 'Fin du CNV');
    cy.get(`[data-cy="InputNumber_Min_Fin du CNV"]`).should('not.exist');
    cy.get(`[data-cy="InputNumber_Max_Fin du CNV"]`).should('exist');
  });

  it('Fréquence - Fréq. CNV tous les patients', () => {
    cy.openFacet('Fréquence', 'Fréq. CNV tous les patients');
    cy.get(`[data-cy="InputNumber_Min_Fréq. CNV tous les patients"]`).should('not.exist');
    cy.get(`[data-cy="InputNumber_Max_Fréq. CNV tous les patients"]`).should('exist');
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

  it('Métrique CQ - Qualité du CNV', () => {
    cy.openFacet('Métrique CQ', 'Qualité du CNV');
    cy.get(`[data-cy="InputNumber_Min_Qualité du CNV"]`).should('exist');
    cy.get(`[data-cy="InputNumber_Max_Qualité du CNV"]`).should('not.exist');
  });

  it('Métrique CQ - PE', () => {
    cy.openFacet('Métrique CQ', 'PE');
    cy.get(`[data-cy="InputNumber_Min_PE"]`).should('not.exist');
    cy.get(`[data-cy="InputNumber_Max_PE"]`).should('exist');
  });

  it('Métrique CQ - SM', () => {
    cy.openFacet('Métrique CQ', 'SM');
    cy.get(`[data-cy="InputNumber_Min_SM"]`).should('not.exist');
    cy.get(`[data-cy="InputNumber_Max_SM"]`).should('exist');
  });
});
