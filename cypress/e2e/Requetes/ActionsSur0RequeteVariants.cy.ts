/// <reference types="cypress"/>
import '../../support/commands';
import { SharedFilters } from '../../pom/shared/Filters';

describe('Page des variants - Requêtes', () => {
  const setupTest = () => {
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitVariantsPage(SharedFilters.variant.emptyQuery);
  };

  it('Construire une première requête', () => {
    setupTest();
    cy.get('body').contains('Utiliser les filtres pour créer une requête').should('exist');
    cy.validateTotalSelectedQuery('1.3M');
    cy.validateTableResultsCount(/1 3\d{2} \d{3}/);

    cy.checkAndClickApplyFacet('Variant', 'Type de variant', 'SNV');

    cy.validatePillSelectedQuery('Type de variant', ['SNV']);
    cy.validateTotalSelectedQuery('1.1M');
    cy.validateTableResultsCount(/1 0\d{2} \d{3}/);
    cy.validateClearAllButton(false);
  });
});
