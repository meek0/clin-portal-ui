/// <reference types="cypress"/>
import '../../support/commands';

describe('Page des CNVs d\'un patient - Opérateurs par défaut', () => {
  let epCHUSJ_ldmCHUSJ: any;
  const setupTest = () => {
    epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
  };

  it('Variant - Nombre de copies', () => {
    setupTest();
    cy.openFacet('Variant', 'Nombre de copies');
    cy.get(`[data-cy="InputNumber_Min_Nombre de copies"]`).should('exist');
    cy.get(`[data-cy="InputNumber_Max_Nombre de copies"]`).should('not.exist');
  });

  it('Variant - Longueur du CNV', () => {
    setupTest();
    cy.openFacet('Variant', 'Longueur du CNV');
    cy.get(`[data-cy="InputNumber_Min_Longueur du CNV"]`).should('exist');
    cy.get(`[data-cy="InputNumber_Max_Longueur du CNV"]`).should('not.exist');
  });

  it('Variant - Début du CNV', () => {
    setupTest();
    cy.openFacet('Variant', 'Début du CNV');
    cy.get(`[data-cy="InputNumber_Min_Début du CNV"]`).should('exist');
    cy.get(`[data-cy="InputNumber_Max_Début du CNV"]`).should('not.exist');
  });

  it('Variant - Fin du CNV', () => {
    setupTest();
    cy.openFacet('Variant', 'Fin du CNV');
    cy.get(`[data-cy="InputNumber_Min_Fin du CNV"]`).should('not.exist');
    cy.get(`[data-cy="InputNumber_Max_Fin du CNV"]`).should('exist');
  });

  it('Variant - Nombre de SNVs', () => {
    setupTest();
    cy.openFacet('Variant', 'Nombre de SNVs');
    cy.get(`[data-cy="InputNumber_Min_Nombre de SNVs"]`).should('exist');
    cy.get(`[data-cy="InputNumber_Max_Nombre de SNVs"]`).should('not.exist');
  });

  it('Fréquence - Fréq. CNV TO tous les patients', () => {
    setupTest();
    cy.openFacet('Fréquence', 'Fréq. CNV TO tous les patients');
    cy.get(`[data-cy="InputNumber_Min_Fréq. CNV TO tous les patients"]`).should('not.exist');
    cy.get(`[data-cy="InputNumber_Max_Fréq. CNV TO tous les patients"]`).should('exist');
  });

  it('Fréquence - Fréq. CNV tous les patients', () => {
    setupTest();
    cy.openFacet('Fréquence', 'Fréq. CNV tous les patients');
    cy.get(`[data-cy="InputNumber_Min_Fréq. CNV tous les patients"]`).should('not.exist');
    cy.get(`[data-cy="InputNumber_Max_Fréq. CNV tous les patients"]`).should('exist');
  });

  it('Fréquence - Fréq. CNV patients atteints', () => {
    setupTest();
    cy.openFacet('Fréquence', 'Fréq. CNV patients atteints');
    cy.get(`[data-cy="InputNumber_Min_Fréq. CNV patients atteints"]`).should('not.exist');
    cy.get(`[data-cy="InputNumber_Max_Fréq. CNV patients atteints"]`).should('exist');
  });

  it('Fréquence - Fréq. CNV patients non atteints', () => {
    setupTest();
    cy.openFacet('Fréquence', 'Fréq. CNV patients non atteints');
    cy.get(`[data-cy="InputNumber_Min_Fréq. CNV patients non atteints"]`).should('not.exist');
    cy.get(`[data-cy="InputNumber_Max_Fréq. CNV patients non atteints"]`).should('exist');
  });

  it('Fréquence - gnomAD 4.1.0', () => {
    setupTest();
    cy.openFacet('Fréquence', 'gnomAD 4.1.0');
    cy.get(`[data-cy="InputNumber_Min_gnomAD 4.1.0"]`).should('not.exist');
    cy.get(`[data-cy="InputNumber_Max_gnomAD 4.1.0"]`).should('exist');
  });

  it('Fréquence - gnomAD 4.1.0 ALT', () => {
    setupTest();
    cy.openFacet('Fréquence', 'gnomAD 4.1.0 ALT');
    cy.get(`[data-cy="InputNumber_Min_gnomAD 4.1.0 ALT"]`).should('not.exist');
    cy.get(`[data-cy="InputNumber_Max_gnomAD 4.1.0 ALT"]`).should('exist');
  });

  it('Métrique CQ - Qualité du CNV', () => {
    setupTest();
    cy.openFacet('Métrique CQ', 'Qualité du CNV');
    cy.get(`[data-cy="InputNumber_Min_Qualité du CNV"]`).should('exist');
    cy.get(`[data-cy="InputNumber_Max_Qualité du CNV"]`).should('not.exist');
  });

  it('Métrique CQ - PE', () => {
    setupTest();
    cy.openFacet('Métrique CQ', 'PE');
    cy.get(`[data-cy="InputNumber_Min_PE"]`).should('not.exist');
    cy.get(`[data-cy="InputNumber_Max_PE"]`).should('exist');
  });

  it('Métrique CQ - SM', () => {
    setupTest();
    cy.openFacet('Métrique CQ', 'SM');
    cy.get(`[data-cy="InputNumber_Min_SM"]`).should('not.exist');
    cy.get(`[data-cy="InputNumber_Max_SM"]`).should('exist');
  });
});
