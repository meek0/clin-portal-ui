/// <reference types="cypress"/>
import '../../support/commands';

let presc_PAIRED: any;

beforeEach(() => {
  presc_PAIRED = Cypress.env('globalData').presc_PAIRED;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPairedPatientPage(presc_PAIRED.patientProbId, presc_PAIRED.prescriptionId.TEBA, 3);
  cy.get('[id="query-builder-header-tools"] [data-icon="plus"]').clickAndWait({force: true});
  cy.createFilterIfNotExists('Cypress_F2');
});

describe('Page des variants d\'un patient (paired) - Filtres', () => {
  it('Supprimer un filtre par la querybar', () => {
    cy.deleteFilter('Cypress_F2');
    
    cy.get('[id="query-builder-header-tools"] [class*="Header_togglerTitle"]').contains(/^Filtre sans titre$/).should('exist');
    cy.get('[class*="ant-dropdown-menu-item"]').contains('Cypress_F2').should('not.exist');
    cy.validateFilterInManager('Cypress_F2', 'not.exist');
    cy.validateIconStates('plus', true/*isDisable*/, false/*isDirty*/);
    cy.validateIconStates('save', true/*isDisable*/, false/*isDirty*/);
    cy.validateIconStates('copy', true/*isDisable*/, false/*isDirty*/);
    cy.validateIconStates('delete', true/*isDisable*/, false/*isDirty*/);
    cy.validateIconStates('share-alt', true/*isDisable*/, false/*isDirty*/);
  });

  it('Supprimer un filtre par le manager', () => {
    cy.get('button[class*="QueryBuilderHeaderTools_queryBuilderHeaderDdb"]').clickAndWait({force: true});
    cy.get('[data-menu-id*="manage-my-filters"]').clickAndWait({force: true});
    cy.get('[class="ant-modal-content"]').contains('Cypress_F2').parentsUntil('li[class*="ListItemWithActions"]').parent().find('[data-icon="delete"]').clickAndWait({force: true});
    cy.clickAndIntercept('[class="ant-modal-content"] button[class*="ant-btn-dangerous"]', 'POST', '**/graphql', 1);
    cy.get('button[class="ant-modal-close"]').invoke('click');
    
    cy.get('[id="query-builder-header-tools"] [class*="Header_togglerTitle"]').contains('Cypress_F2').should('not.exist');
    cy.get('[class*="ant-dropdown-menu-item"]').contains('Cypress_F2').should('not.exist');
    cy.validateFilterInManager('Cypress_F2', 'not.exist');
    cy.validateIconStates('plus', true/*isDisable*/, false/*isDirty*/);
    cy.validateIconStates('save', true/*isDisable*/, false/*isDirty*/);
    cy.validateIconStates('copy', true/*isDisable*/, false/*isDirty*/);
    cy.validateIconStates('delete', true/*isDisable*/, false/*isDirty*/);
    cy.validateIconStates('share-alt', true/*isDisable*/, false/*isDirty*/);
  });
});
