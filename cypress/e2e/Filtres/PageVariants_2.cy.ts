/// <reference types="cypress"/>
import '../../support/commands';

describe('Page des variants - Filtres', () => {
  const setupTest = () => {
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitVariantsPage();
    cy.get('[id="query-builder-header-tools"] [data-icon="plus"]').clickAndWait({force: true});
    cy.deleteFilterIfExists('Cypress_FA');
    cy.deleteFilterIfExists('Cypress_F1 COPIÉ');
    cy.createFilterIfNotExists('Cypress_F1');
  };

  it('Sélectionner un filtre dans la dropdown', () => {
    setupTest();
    cy.get('button[class*="QueryBuilderHeaderTools_queryBuilderHeaderDdb"]').clickAndWait({force: true});
    cy.get('[class*="ant-dropdown-menu-item"]').contains('Cypress_F1').clickAndWait({force: true});

    cy.get('[id="query-builder-header-tools"] [class*="Header_togglerTitle"]').contains(/^Cypress_F1$/).should('exist');
    cy.validateSelectedFilterInDropdown('Cypress_F1');
    cy.validateIconStates('plus', false/*isDisable*/, false/*isDirty*/);
    cy.validateIconStates('save', true/*isDisable*/, false/*isDirty*/);
    cy.validateIconStates('copy', false/*isDisable*/, false/*isDirty*/);
    cy.validateIconStates('delete', false/*isDisable*/, false/*isDirty*/);
    cy.validateIconStates('share-alt', false/*isDisable*/, false/*isDirty*/);
  });

  it('Renommer un filtre par la querybar', () => {
    setupTest();
    cy.get('button[class*="QueryBuilderHeaderTools_queryBuilderHeaderDdb"]').clickAndWait({force: true});
    cy.get('[class*="ant-dropdown-menu-item"]').contains(/^Cypress_F1$/).clickAndWait({force: true});
    cy.saveFilterAs('Cypress_FA');

    cy.get('[id="query-builder-header-tools"] [class*="Header_togglerTitle"]').contains(/^Cypress_FA$/).should('exist');
    cy.get('[class*="ant-dropdown-menu-item"]').contains(/^Cypress_F1$/).should('not.exist');
    cy.validateSelectedFilterInDropdown('Cypress_FA');
    cy.validateFilterInManager('Cypress_F1', 'not.exist');
    cy.validateFilterInManager('Cypress_FA', 'exist');
    cy.validateIconStates('plus', false/*isDisable*/, false/*isDirty*/);
    cy.validateIconStates('save', true/*isDisable*/, false/*isDirty*/);
    cy.validateIconStates('copy', false/*isDisable*/, false/*isDirty*/);
    cy.validateIconStates('delete', false/*isDisable*/, false/*isDirty*/);
    cy.validateIconStates('share-alt', false/*isDisable*/, false/*isDirty*/);
  });

  it('Renommer un filtre par le manager', () => {
    setupTest();
    cy.get('button[class*="QueryBuilderHeaderTools_queryBuilderHeaderDdb"]').clickAndWait({force: true});
    cy.get('[data-menu-id*="manage-my-filters"]').clickAndWait({force: true});
    cy.get('[class="ant-modal-content"]').contains(/^Cypress_F1$/).parentsUntil('li[class*="ListItemWithActions"]').parent().find('[data-icon="edit"]').clickAndWait({force: true});
    cy.get('[class="ant-modal-content"] input').clear().type('Cypress_FA');
    cy.get(`[class="ant-modal-content"] input[value="Cypress_FA"]`).should('exist');
    cy.clickAndIntercept('[class="ant-modal-content"] button[class*="ant-btn-primary"]', 'PUT', '**/saved-filters/**', 1, 1);
    cy.get('button[class="ant-modal-close"]').invoke('click');

    cy.get('[class*="ant-dropdown-menu-item"]').contains(/^Cypress_F1$/).should('not.exist');
    cy.get('[class*="ant-dropdown-menu-item"]').contains('Cypress_FA').should('exist');
    cy.validateFilterInManager('Cypress_F1', 'not.exist');
    cy.validateFilterInManager('Cypress_FA', 'exist');
  });

  it('Dupliquer un filtre sans sauvegarder [CLIN-2762]', () => {
    setupTest();
    cy.get('button[class*="QueryBuilderHeaderTools_queryBuilderHeaderDdb"]').clickAndWait({force: true});
    cy.get('[class*="ant-dropdown-menu-item"]').contains('Cypress_F1').clickAndWait({force: true});
    cy.get('[id="query-builder-header-tools"] [data-icon="copy"]').clickAndWait({force: true});
    
    cy.get('[id="query-builder-header-tools"] [class*="Header_togglerTitle"]').contains(/^Cypress_F1 COPIÉ$/).should('exist');
    cy.get('[class*="ant-dropdown-menu-item"]').contains('Cypress_F1 COPIÉ').should('not.exist');
    cy.validateFilterInManager('Cypress_F1 COPIÉ', 'not.exist');
    cy.validateIconStates('plus', true/*isDisable*/, false/*isDirty*/);
    cy.validateIconStates('save', false/*isDisable*/, true/*isDirty*/);
    cy.validateIconStates('copy', true/*isDisable*/, false/*isDirty*/);
    cy.validateIconStates('delete', true/*isDisable*/, false/*isDirty*/);
    cy.validateIconStates('share-alt', true/*isDisable*/, false/*isDirty*/);
  });

  it('Dupliquer un filtre et sauvegarder [CLIN-2762]', () => {
    setupTest();
    cy.get('button[class*="QueryBuilderHeaderTools_queryBuilderHeaderDdb"]').clickAndWait({force: true});
    cy.get('[class*="ant-dropdown-menu-item"]').contains('Cypress_F1').clickAndWait({force: true});
    cy.get('[id="query-builder-header-tools"] [data-icon="copy"]').clickAndWait({force: true});
    cy.get('[id="query-builder-header-tools"] [data-icon="save"]').clickAndWait({force: true});
    
    cy.get('[id="query-builder-header-tools"] [class*="Header_togglerTitle"]').contains(/^Cypress_F1 COPIÉ$/).should('exist');
    cy.get('[class*="ant-dropdown-menu-item"]').contains('Cypress_F1 COPIÉ').should('not.exist');
    cy.validateFilterInManager('Cypress_F1 COPIÉ', 'not.exist');
    cy.validateIconStates('plus', true/*isDisable*/, false/*isDirty*/);
    cy.validateIconStates('save', false/*isDisable*/, true/*isDirty*/);
    cy.validateIconStates('copy', true/*isDisable*/, false/*isDirty*/);
    cy.validateIconStates('delete', true/*isDisable*/, false/*isDirty*/);
    cy.validateIconStates('share-alt', true/*isDisable*/, false/*isDirty*/);
  });
});
