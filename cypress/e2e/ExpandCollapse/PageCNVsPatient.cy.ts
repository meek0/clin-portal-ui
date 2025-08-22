/// <reference types="cypress"/>
import '../../support/commands';

describe('Page des CNVs d\'un patient - Valider les liens disponibles', () => {
  let epCHUSJ_ldmCHUSJ: any;
  const setupTest = () => {
    epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
  };

  it('Panel RQDM - Expand all/Collapse all', () => {
    setupTest();
    cy.validateExpandCollapse('Panel RQDM');
  });

  it('Variant - Expand all/Collapse all', () => {
    setupTest();
    cy.validateExpandCollapse('Variant');
  });

  it('Gène - Expand all/Collapse all', () => {
    setupTest();
    cy.validateExpandCollapse('Gène', true);
  });

  it('Fréquence - Expand all/Collapse all', () => {
    setupTest();
    cy.validateExpandCollapse('Fréquence', true);
  });

  it('Pathogénicité - Expand all/Collapse all', () => {
    setupTest();
    cy.validateExpandCollapse('Pathogénicité', true);
  });

  it('Analyse parentale - Expand all/Collapse all', () => {
    setupTest();
    cy.validateExpandCollapse('Analyse parentale');
  });

  it('Métrique CQ - Expand all/Collapse all', () => {
    setupTest();
    cy.validateExpandCollapse('Métrique CQ');
  });
});
