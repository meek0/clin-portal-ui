/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
  cy.get('[id="query-builder-header-tools"] [data-icon="plus"]').clickAndWait({force: true});
  cy.deleteFilterIfExists('Cypress_F0');
});

describe('Page des CNVs d\'un patient - Filtres', () => {
  it('Créer un nouveau filtre', () => {
    cy.saveFilterAs('Cypress_F0');

    cy.get('[id="query-builder-header-tools"] [class*="Header_togglerTitle"]').contains(/^Cypress_F0$/).should('exist');
    cy.validateSelectedFilterInDropdown('Cypress_F0');
    cy.validateFilterInManager('Cypress_F0', 'exist');
    cy.validateIconStates('plus', false/*isDisable*/, false/*isDirty*/);
    cy.validateIconStates('save', true/*isDisable*/, false/*isDirty*/);
    cy.validateIconStates('copy', false/*isDisable*/, false/*isDirty*/);
    cy.validateIconStates('delete', false/*isDisable*/, false/*isDirty*/);
    cy.validateIconStates('share-alt', false/*isDisable*/, false/*isDirty*/);
  });
});
