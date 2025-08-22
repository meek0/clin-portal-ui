/// <reference types="cypress"/>
import '../../support/commands';

describe('Page des variants d\'un patient (paired) - Filtres', () => {
  let presc_PAIRED: any;
  const setupTest = () => {
    presc_PAIRED = Cypress.env('globalData').presc_PAIRED;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitVariantsPairedPatientPage(presc_PAIRED.patientProbId, presc_PAIRED.prescriptionId.TEBA, 3);
    cy.get('[id="query-builder-header-tools"] [data-icon="plus"]').clickAndWait({force: true});
    cy.deleteFilterIfExists('Cypress_F0');
  };

  it('Créer un nouveau filtre', () => {
    setupTest();
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
