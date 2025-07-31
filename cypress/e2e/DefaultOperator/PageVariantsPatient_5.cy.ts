/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
});

describe('Page des variants d\'un patient - Opérateurs par défaut', () => {
  it('Occurrence - Nombre de CNVs', () => {
    cy.openFacet('Occurrence', 'Nombre de CNVs');
    cy.get(`[data-cy="InputNumber_Min_Nombre de CNVs"]`).should('exist');
    cy.get(`[data-cy="InputNumber_Max_Nombre de CNVs"]`).should('not.exist');
  });

  it('Occurrence - Qualité de profondeur', () => {
    cy.openFacet('Occurrence', 'Qualité de profondeur');
    cy.get(`[data-cy="InputNumber_Min_Qualité de profondeur"]`).should('exist');
    cy.get(`[data-cy="InputNumber_Max_Qualité de profondeur"]`).should('not.exist');
  });

  it('Occurrence - Profondeur allélique ALT', () => {
    cy.openFacet('Occurrence', 'Profondeur allélique ALT');
    cy.get(`[data-cy="InputNumber_Min_Profondeur allélique ALT"]`).should('exist');
    cy.get(`[data-cy="InputNumber_Max_Profondeur allélique ALT"]`).should('not.exist');
  });

  it('Occurrence - Profondeur totale ALT + REF', () => {
    cy.openFacet('Occurrence', 'Profondeur totale ALT + REF');
    cy.get(`[data-cy="InputNumber_Min_Profondeur totale ALT + REF"]`).should('exist');
    cy.get(`[data-cy="InputNumber_Max_Profondeur totale ALT + REF"]`).should('not.exist');
  });

  it('Occurrence - Ratio allélique ALT / (ALT+REF)', () => {
    cy.openFacet('Occurrence', 'Ratio allélique ALT / (ALT+REF)');
    cy.get(`[data-cy="InputNumber_Min_Ratio allélique ALT / (ALT+REF)"]`).should('exist');
    cy.get(`[data-cy="InputNumber_Max_Ratio allélique ALT / (ALT+REF)"]`).should('not.exist');
  });

  it('Occurrence - Qualité du génotype', () => {
    cy.openFacet('Occurrence', 'Qualité du génotype');
    cy.get(`[data-cy="InputNumber_Min_Qualité du génotype"]`).should('exist');
    cy.get(`[data-cy="InputNumber_Max_Qualité du génotype"]`).should('not.exist');
  });
});
