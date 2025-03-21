/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitPrescriptionsPage();
  cy.checkValueFacet('Statut des prescriptions', 'active');
  cy.get('div[id*="tab-requests"]').clickAndWait({force: true});
  cy.resetColumns(1);
});

describe('Page des prescriptions et requêtes - Rechercher des requêtes', () => {
  it('Par numéro de prescription', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.prescriptionId, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.prescriptionId.length);

    cy.get('[data-node-key="requests"]').contains('Requêtes (3)').should('exist');
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestProbId, 1, epCHUSJ_ldmCHUSJ.requestProbId);
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestMthId, 1, epCHUSJ_ldmCHUSJ.requestMthId);
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestFthId, 1, epCHUSJ_ldmCHUSJ.requestFthId);
  });
});
