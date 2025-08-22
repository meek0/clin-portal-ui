/// <reference types="cypress"/>
import '../../support/commands';

describe('Page du rapport général d\'un patient - Valider les panneaux masquables', () => {
  let epCHUSJ_ldmCHUSJ: any;
  const setupTest = () => {
    epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitCQPatientPage(epCHUSJ_ldmCHUSJ.prescriptionId);
  };

  it('Panneau Sommaire', () => {
    setupTest();
    cy.get('[data-cy="_CollapsePanel"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[data-cy="_CollapsePanel"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[data-cy="_CollapsePanel"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[data-cy="_CollapsePanel"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[data-cy="_CollapsePanel"] div[class*="ant-collapse-content-active"]').should('exist');
  });
});
