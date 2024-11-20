/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

describe('Page des variants d\'un patient - Requêtes', () => {

  beforeEach(() => {
    cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3, '48bf4129-3e45-41d6-be4f-63a25c57b71e');
  });

  it('Éditer une pilule via la facette', () => {
    cy.checkAndClickApplyFacet('Variant', 'Type de variant', 'insertion');

    cy.validatePillSelectedQuery('Type de variant', ['SNV','Insertion']);
    cy.validateTotalSelectedQuery('170K');
    cy.validateTableResultsCount('170 122');
    cy.validateClearAllButton(false);
  });

  it('Éditer une pilule via son popup [CLIN-3538]', () => {
    cy.get('[class*="QueryValues_queryValuesContainer"]').contains('SNV').clickAndWait({force:true});
    cy.get('[class*="filtersDropdown"] input[id="input-insertion"]').check({force: true});
    cy.clickAndIntercept('[class*="filtersDropdown"] [data-cy="Apply_Type de variant"]', 'POST', '**/graphql', 3);

    cy.validatePillSelectedQuery('Type de variant', ['SNV','Insertion']);
    cy.validateTotalSelectedQuery('170K');
    cy.validateTableResultsCount('170 122');
    cy.validateClearAllButton(false);
  });

  it('Ajouter une pilule à une requête', () => {
    cy.checkAndClickApplyFacet('Variant', 'Chromosome', '19');

    cy.validatePillSelectedQuery('Type de variant', ['SNV']);
    cy.validatePillSelectedQuery('Chromosome', ['19'], 1);
    cy.validateOperatorSelectedQuery('Et');
    cy.validateTotalSelectedQuery('10.1K');
    cy.validateTableResultsCount('10 132');
    cy.validateClearAllButton(false);
  });

  it('Construire une deuxième requête', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('button[class*="QueryTools_button"]').contains('Nouvelle requête').clickAndWait({force:true});
    cy.wait('@getPOSTgraphql');
    cy.wait('@getPOSTgraphql');

    cy.get('body').contains('Utiliser les filtres pour créer une requête').should('exist');
    cy.validateTotalSelectedQuery('184K');
    cy.validateTableResultsCount('184 077');
    cy.validateClearAllButton(false);

    cy.checkAndClickApplyFacet('Variant', 'Chromosome', '19');

    cy.validatePillSelectedQuery('Chromosome', ['19']);
    cy.validateTotalSelectedQuery('11.8K');
    cy.validateTableResultsCount('11 806');
    cy.validateClearAllButton(true);
  });

  it('Dupliquer une requête', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('[class*="QueryBar_selected"] [data-icon="copy"]').clickAndWait({force: true});
    cy.wait('@getPOSTgraphql');

    cy.validatePillSelectedQuery('Type de variant', ['SNV']);
    cy.validateTotalSelectedQuery('158K');
    cy.validateTableResultsCount('157 594');
    cy.validateClearAllButton(true);
  });
});
