/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

describe('Page des variants - Requêtes', () => {

  beforeEach(() => {
    cy.visitVariantsPage('?sharedFilterId=100c6b39-f4f6-48bb-bb83-d92f20562308');
  });

  it('Modifier l\'opérateur d\'une requête', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql1');
    cy.get('[class*="QueryBar_selected"] [class*="Combiner_operator"]').clickAndWait({force: true});
    cy.wait('@getPOSTgraphql1');
    cy.wait('@getPOSTgraphql1');

    cy.validatePillSelectedQuery('Type de variant', ['SNV']);
    cy.validatePillSelectedQuery('Position', ['100000'], 1);
    cy.validateOperatorSelectedQuery('Ou');
    cy.validateTotalSelectedQuery('1.1M');
    cy.validateTableResultsCount(/1 0\d{2} \d{3}/);
    cy.validateClearAllButton(false);

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql2');
    cy.get('[class*="QueryBar_selected"] [class*="Combiner_operator"]').clickAndWait({force: true});
    cy.wait('@getPOSTgraphql2');
    cy.wait('@getPOSTgraphql2');

    cy.validatePillSelectedQuery('Type de variant', ['SNV']);
    cy.validatePillSelectedQuery('Position', ['100000'], 1);
    cy.validateOperatorSelectedQuery('Et');
    cy.validateTotalSelectedQuery(/1,2\d{2}/);
    cy.validateTableResultsCount(/1 2\d{2}/);
    cy.validateClearAllButton(false);
  });

  it('Supprimer une des pilules d\'une requête avec le X', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_selected"] button[class*="QueryPill_close"]').eq(0).clickAndWait();
    cy.wait('@getPOSTgraphql');
    cy.wait('@getPOSTgraphql');

    cy.validatePillSelectedQuery('Position', ['100000']);
    cy.validateTotalSelectedQuery(/1,(3|4)\d{2}/);
    cy.validateTableResultsCount(/1 (3|4)\d{2}/);
    cy.validateClearAllButton(false);
  });
});
