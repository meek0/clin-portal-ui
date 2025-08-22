/// <reference types="cypress"/>
import '../../support/commands';

describe('Page des variants d\'un patient - Opérateurs par défaut', () => {
  let epCHUSJ_ldmCHUSJ: any;
  const setupTest = () => {
    epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
  };

  it('Pathogénicité - Score Exomiser', () => {
    setupTest();
    cy.openFacet('Pathogénicité', 'Score Exomiser');
    cy.get(`[data-cy="InputNumber_Min_Score Exomiser"]`).should('exist');
    cy.get(`[data-cy="InputNumber_Max_Score Exomiser"]`).should('not.exist');
  });

  it('Pathogénicité - Score Franklin', () => {
    setupTest();
    cy.openFacet('Pathogénicité', 'Score Franklin');
    cy.get(`[data-cy="InputNumber_Min_Score Franklin"]`).should('exist');
    cy.get(`[data-cy="InputNumber_Max_Score Franklin"]`).should('not.exist');
  });

  it('Pathogénicité - CADD (Phred)', () => {
    setupTest();
    cy.openFacet('Pathogénicité', 'CADD (Phred)');
    cy.get(`[data-cy="InputNumber_Min_CADD (Phred)"]`).should('exist');
    cy.get(`[data-cy="InputNumber_Max_CADD (Phred)"]`).should('not.exist');
  });

  it('Pathogénicité - CADD (raw)', () => {
    setupTest();
    cy.openFacet('Pathogénicité', 'CADD (raw)');
    cy.get(`[data-cy="InputNumber_Min_CADD (raw)"]`).should('exist');
    cy.get(`[data-cy="InputNumber_Max_CADD (raw)"]`).should('not.exist');
  });

  it('Pathogénicité - DANN', () => {
    setupTest();
    cy.openFacet('Pathogénicité', 'DANN');
    cy.get(`[data-cy="InputNumber_Min_DANN"]`).should('exist');
    cy.get(`[data-cy="InputNumber_Max_DANN"]`).should('not.exist');
  });

  it('Pathogénicité - SpliceAI', () => {
    setupTest();
    cy.openFacet('Pathogénicité', 'SpliceAI');
    cy.get(`[data-cy="InputNumber_Min_SpliceAI"]`).should('exist');
    cy.get(`[data-cy="InputNumber_Max_SpliceAI"]`).should('not.exist');
  });

  it('Pathogénicité - REVEL', () => {
    setupTest();
    cy.openFacet('Pathogénicité', 'REVEL');
    cy.get(`[data-cy="InputNumber_Min_REVEL"]`).should('exist');
    cy.get(`[data-cy="InputNumber_Max_REVEL"]`).should('not.exist');
  });

  it('Pathogénicité - CMC', () => {
    setupTest();
    cy.openFacet('Pathogénicité', 'CMC');
    cy.get(`[data-cy="InputNumber_Min_CMC"]`).should('exist');
    cy.get(`[data-cy="InputNumber_Max_CMC"]`).should('not.exist');
  });

  it('Pathogénicité - CMC (ratio)', () => {
    setupTest();
    cy.openFacet('Pathogénicité', 'CMC (ratio)');
    cy.get(`[data-cy="InputNumber_Min_CMC (ratio)"]`).should('exist');
    cy.get(`[data-cy="InputNumber_Max_CMC (ratio)"]`).should('not.exist');
  });
});
