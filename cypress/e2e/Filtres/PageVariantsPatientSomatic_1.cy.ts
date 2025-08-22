/// <reference types="cypress"/>
import '../../support/commands';

describe('Page des variants d\'un patient (somatic) - Filtres', () => {
  let presc_SOMATIC: any;
  const setupTest = () => {
    presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitVariantsPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);
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
