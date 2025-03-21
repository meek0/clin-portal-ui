/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitPrescriptionsPage();
  cy.checkValueFacet('Statut des prescriptions', 'active');
});

describe('Page des prescriptions et requêtes - Rechercher des prescriptions', () => {
  it('Par numéro de prescription', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.prescriptionId, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.prescriptionId.length);

    cy.get('[data-node-key="prescriptions"]').contains('Prescriptions (1)').should('exist');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.prescriptionId, 2, true/*hasCheckbox*/);
  });
});
