/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
});

describe('Page des variants d\'un patient - Opérateurs par défaut', () => {
  it('Pathogénicité - Score Exomiser', () => {
    cy.openFacet('Pathogénicité', 'Score Exomiser');
    cy.get(`[data-cy="InputNumber_Min_Score Exomiser"]`).should('exist');
    cy.get(`[data-cy="InputNumber_Max_Score Exomiser"]`).should('not.exist');
  });

  it('Pathogénicité - Score Franklin', () => {
    cy.openFacet('Pathogénicité', 'Score Franklin');
    cy.get(`[data-cy="InputNumber_Min_Score Franklin"]`).should('exist');
    cy.get(`[data-cy="InputNumber_Max_Score Franklin"]`).should('not.exist');
  });

  it('Pathogénicité - CADD (Phred)', () => {
    cy.openFacet('Pathogénicité', 'CADD (Phred)');
    cy.get(`[data-cy="InputNumber_Min_CADD (Phred)"]`).should('exist');
    cy.get(`[data-cy="InputNumber_Max_CADD (Phred)"]`).should('not.exist');
  });

  it('Pathogénicité - CADD (raw)', () => {
    cy.openFacet('Pathogénicité', 'CADD (raw)');
    cy.get(`[data-cy="InputNumber_Min_CADD (raw)"]`).should('exist');
    cy.get(`[data-cy="InputNumber_Max_CADD (raw)"]`).should('not.exist');
  });

  it('Pathogénicité - DANN', () => {
    cy.openFacet('Pathogénicité', 'DANN');
    cy.get(`[data-cy="InputNumber_Min_DANN"]`).should('exist');
    cy.get(`[data-cy="InputNumber_Max_DANN"]`).should('not.exist');
  });

  it('Pathogénicité - SpliceAI', () => {
    cy.openFacet('Pathogénicité', 'SpliceAI');
    cy.get(`[data-cy="InputNumber_Min_SpliceAI"]`).should('exist');
    cy.get(`[data-cy="InputNumber_Max_SpliceAI"]`).should('not.exist');
  });

  it('Pathogénicité - REVEL', () => {
    cy.openFacet('Pathogénicité', 'REVEL');
    cy.get(`[data-cy="InputNumber_Min_REVEL"]`).should('exist');
    cy.get(`[data-cy="InputNumber_Max_REVEL"]`).should('not.exist');
  });

  it('Pathogénicité - CMC', () => {
    cy.openFacet('Pathogénicité', 'CMC');
    cy.get(`[data-cy="InputNumber_Min_CMC"]`).should('exist');
    cy.get(`[data-cy="InputNumber_Max_CMC"]`).should('not.exist');
  });

  it('Pathogénicité - CMC (ratio)', () => {
    cy.openFacet('Pathogénicité', 'CMC (ratio)');
    cy.get(`[data-cy="InputNumber_Min_CMC (ratio)"]`).should('exist');
    cy.get(`[data-cy="InputNumber_Max_CMC (ratio)"]`).should('not.exist');
  });
});
