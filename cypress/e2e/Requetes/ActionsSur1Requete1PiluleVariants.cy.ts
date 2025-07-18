/// <reference types="cypress"/>
import '../../support/commands';
import { SharedFilters } from '../../pom/shared/Filters';

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPage(SharedFilters.variant.onePill);
});

describe('Page des variants - Requêtes', () => {
  it('Éditer une pilule via la facette', () => {
    cy.checkAndClickApplyFacet('Variant', 'Type de variant', 'insertion');

    cy.validatePillSelectedQuery('Type de variant', ['SNV','Insertion']);
    cy.validateTotalSelectedQuery('1.2M');
    cy.validateTableResultsCount(/1 1\d{2} \d{3}/);
    cy.validateClearAllButton(false);
  });

  it('Éditer une pilule via son popup', () => {
    cy.get('[class*="QueryValues_queryValuesContainer"]').contains('SNV').clickAndWait({force:true});
    cy.get('[class*="filtersDropdown"] input[id="input-insertion"]').check({force: true});
    cy.clickAndIntercept('[class*="filtersDropdown"] [data-cy="Apply_Type de variant"]', 'POST', '**/graphql', 3);

    cy.validatePillSelectedQuery('Type de variant', ['SNV','Insertion']);
    cy.validateTotalSelectedQuery('1.2M');
    cy.validateTableResultsCount(/1 \d{3} \d{3}/);
    cy.validateClearAllButton(false);
  });

  it('Ajouter une pilule à une requête', () => {
    cy.checkAndClickApplyFacet('Variant', 'Chromosome', '19');

    cy.validatePillSelectedQuery('Type de variant', ['SNV']);
    cy.validatePillSelectedQuery('Chromosome', ['19'], 1);
    cy.validateOperatorSelectedQuery('Et');
    cy.validateTotalSelectedQuery(/(69.(5|6)|70)K/);
    cy.validateTableResultsCount(/69 \d{3}/);
    cy.validateClearAllButton(false);
  });

  it('Construire une deuxième requête', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('button[class*="QueryTools_button"]').contains('Nouvelle requête').clickAndWait({force:true});
    cy.wait('@getPOSTgraphql');
    cy.wait('@getPOSTgraphql');

    cy.get('body').contains('Utiliser les filtres pour créer une requête').should('exist');
    cy.validateTotalSelectedQuery('1.3M');
    cy.validateTableResultsCount(/1 3\d{2} \d{3}/);
    cy.validateClearAllButton(false);

    cy.checkAndClickApplyFacet('Variant', 'Chromosome', '19');

    cy.validatePillSelectedQuery('Chromosome', ['19']);
    cy.validateTotalSelectedQuery(/83.\d{1}K/);
    cy.validateTableResultsCount(/83 \d{3}/);
    cy.validateClearAllButton(true);
  });

  it('Dupliquer une requête', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('[class*="QueryBar_selected"] [data-icon="copy"]').clickAndWait({force: true});
    cy.wait('@getPOSTgraphql');

    cy.validatePillSelectedQuery('Type de variant', ['SNV']);
    cy.validateTotalSelectedQuery('1.1M');
    cy.validateTableResultsCount(/1 0\d{2} \d{3}/);
    cy.validateClearAllButton(true);
  });
});
