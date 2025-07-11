/// <reference types="cypress"/>
import '../../support/commands';
import { SharedFilters } from '../../pom/shared/Filters';

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPage(SharedFilters.variant.twoQueries);
});

describe('Page des variants - Requêtes', () => {
  it('Sélectionner une requête', () => {
    cy.validateTableResultsCount(/1 0\d{2} \d{3}/);

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(1).clickAndWait();
    cy.wait('@getPOSTgraphql');

    cy.validateTableResultsCount(/1 (3|4)\d{2}/);
  });

  it('Afficher/Masquer les champs', () => {
    cy.get('button[role="switch"]').clickAndWait({force: true});

    cy.validatePillSelectedQuery('', ['SNV']);
    cy.validateTotalSelectedQuery('1.1M');
    cy.validateTableResultsCount(/1 0\d{2} \d{3}/);
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(1).clickAndWait();
    cy.validatePillSelectedQuery('Position', ['100000']);
    cy.validateTotalSelectedQuery(/1,(3|4)\d{2}/);
    cy.validateTableResultsCount(/1 (3|4)\d{2}/);
    cy.validateClearAllButton(true);

    cy.get('button[role="switch"]').clickAndWait({force: true});

    cy.validatePillSelectedQuery('Position', ['100000']);
    cy.validateTotalSelectedQuery(/1,(3|4)\d{2}/);
    cy.validateTableResultsCount(/1 (3|4)\d{2}/);
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(0).clickAndWait();
    cy.validatePillSelectedQuery('Type de variant', ['SNV']);
    cy.validateTotalSelectedQuery('1.1M');
    cy.validateTableResultsCount(/1 0\d{2} \d{3}/);
    cy.validateClearAllButton(true);
  });

  it('Masquer/Afficher le panneau des requêtes', () => {
    cy.get('span[class*="ant-collapse-arrow"]').clickAndWait({force: true});

    cy.get('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.validateTableResultsCount(/1 0\d{2} \d{3}/);

    cy.get('span[class*="ant-collapse-arrow"]').clickAndWait({force: true});

    cy.get('div[class*="ant-collapse-content-active"]').should('exist');
    cy.validatePillSelectedQuery('Type de variant', ['SNV']);
    cy.validateTotalSelectedQuery('1.1M');
    cy.validateTableResultsCount(/1 0\d{2} \d{3}/);
    cy.validateClearAllButton(true);
  });

  it('Combiner deux requêtes avec ET', () => {
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(0).find('input[class="ant-checkbox-input"]').check({force: true});
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(1).find('input[class="ant-checkbox-input"]').check({force: true});
    cy.get('[class*="QueryTools"] button[class*="ant-dropdown-trigger"]').clickAndWait({force: true});
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('[class="ant-dropdown-menu-title-content"]').contains('Et').clickAndWait({force: true});
    cy.wait('@getPOSTgraphql');
    cy.wait('@getPOSTgraphql');

    cy.validatePillSelectedQuery('', ['Q1']);
    cy.validatePillSelectedQuery('', ['Q2'], 1);
    cy.validateOperatorSelectedQuery('Et');
    cy.validateTotalSelectedQuery(/1,2\d{2}/);
    cy.validateTableResultsCount(/1 2\d{2}/);
    cy.validateClearAllButton(true);
  });

  it('Combiner deux requêtes avec OU', () => {
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(0).find('input[class="ant-checkbox-input"]').check({force: true});
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(1).find('input[class="ant-checkbox-input"]').check({force: true});
    cy.get('[class*="QueryTools"] button[class*="ant-dropdown-trigger"]').clickAndWait({force: true});
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('[class="ant-dropdown-menu-title-content"]').contains('Ou').clickAndWait({force: true});
    cy.wait('@getPOSTgraphql');
    cy.wait('@getPOSTgraphql');

    cy.validatePillSelectedQuery('', ['Q1']);
    cy.validatePillSelectedQuery('', ['Q2'], 1);
    cy.validateOperatorSelectedQuery('Ou');
    cy.validateTotalSelectedQuery('1.1M');
    cy.validateTableResultsCount(/1 0\d{2} \d{3}/);
    cy.validateClearAllButton(true);
  });

  it('Combiner deux requêtes avec Combiner', () => {
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(0).find('input[class="ant-checkbox-input"]').check({force: true});
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(1).find('input[class="ant-checkbox-input"]').check({force: true});
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('[class*="QueryTools"] button[class*="ant-btn-compact-first-item"]').clickAndWait({force: true});
    cy.wait('@getPOSTgraphql');
    cy.wait('@getPOSTgraphql');

    cy.validatePillSelectedQuery('', ['Q1']);
    cy.validatePillSelectedQuery('', ['Q2'], 1);
    cy.validateOperatorSelectedQuery('Et');
    cy.validateTotalSelectedQuery(/1,2\d{2}/);
    cy.validateTableResultsCount(/1 2\d{2}/);
    cy.validateClearAllButton(true);
  });

  it('Supprimer une requête avec le bouton et annuler', () => {
    cy.get('[class*="QueryBar_selected"] [data-icon="delete"]').clickAndWait({force: true});
    cy.get('[class*="ant-popconfirm"]').should('not.have.class', 'ant-popover-hidden');

    cy.get('[class*="ant-popconfirm"] button[class*="ant-btn-default"]').clickAndWait({force:true});
    cy.get('[class*="ant-popconfirm"]').should('have.class', 'ant-popover-hidden');
    cy.get('[class*="QueryBar_queryBarWrapper"]').its('length').should('eq', 2);
    cy.validatePillSelectedQuery('Type de variant', ['SNV']);
    cy.validateTotalSelectedQuery('1.1M');
    cy.validateTableResultsCount(/1 0\d{2} \d{3}/);
    cy.validateClearAllButton(true);
  });

  it('Supprimer une requête avec le bouton et confirmer', () => {
    cy.get('[class*="QueryBar_selected"] [data-icon="delete"]').clickAndWait({force: true});
    cy.get('[class*="ant-popconfirm"]').should('not.have.class', 'ant-popover-hidden');

    cy.clickAndIntercept('[class*="ant-popconfirm"] button[class*="ant-btn-primary"]', 'POST', '**/graphql', 1);
    cy.get('[class*="ant-popconfirm"]').should('not.exist');
    cy.get('[class*="QueryBar_queryBarWrapper"]').its('length').should('eq', 1);
    cy.validatePillSelectedQuery('Position', ['100000']);
    cy.validateTotalSelectedQuery(/1,(3|4)\d{2}/);
    cy.validateTableResultsCount(/1 (3|4)\d{2}/);
    cy.validateClearAllButton(false);
  });

  it('Supprimer l\'unique pilule d\'une requête avec le X', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_selected"] button[class*="QueryPill_close"]').clickAndWait();
    cy.wait('@getPOSTgraphql');

    cy.get('[class*="QueryBar_queryBarWrapper"]').its('length').should('eq', 1);
    cy.validatePillSelectedQuery('Position', ['100000']);
    cy.validateTotalSelectedQuery(/1,(3|4)\d{2}/);
    cy.validateTableResultsCount(/1 (3|4)\d{2}/);
    cy.validateClearAllButton(false);
  });

  it('Supprimer toutes les requêtes avec le bouton et annuler', () => {
    cy.get('[id="query-builder-header-tools"]').contains('Tout effacer').clickAndWait({force: true});
    cy.get('[class*="ant-modal-confirm"]').should('exist');

    cy.get('[class*="ant-modal-confirm"] button[class*="ant-btn-default"]').clickAndWait({force:true});
    cy.get('[class*="ant-modal-confirm"]').should('not.exist');
    cy.get('[class*="QueryBar_queryBarWrapper"]').its('length').should('eq', 2);
    cy.validatePillSelectedQuery('Type de variant', ['SNV']);
    cy.validateTotalSelectedQuery('1.1M');
    cy.validateTableResultsCount(/1 0\d{2} \d{3}/);
    cy.validateClearAllButton(true);
  });

  it('Supprimer toutes les requêtes avec le bouton et supprimer', () => {
    cy.get('[id="query-builder-header-tools"]').contains('Tout effacer').clickAndWait({force: true});
    cy.get('[class*="ant-modal-confirm"]').should('exist');

    cy.get('[class*="ant-modal-confirm"] button[class*="ant-btn-primary"]').clickAndWait({force:true});
    cy.get('[class*="ant-modal-confirm"]').should('not.exist');
    cy.get('body').contains('Utiliser les filtres pour créer une requête').should('exist');
    cy.validateTotalSelectedQuery('1.3M');
    cy.validateTableResultsCount(/1 3\d{2} \d{3}/);
    cy.validateClearAllButton(false);
  });
});
