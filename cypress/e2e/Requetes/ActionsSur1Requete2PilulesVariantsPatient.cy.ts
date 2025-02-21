/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3, '19d99a98-8d16-45a3-8c4c-e6daf593b644');
});

describe('Page des variants d\'un patient - Requêtes', () => {
  it('Modifier l\'opérateur d\'une requête', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql1');
    cy.get('[class*="QueryBar_selected"] [class*="Combiner_operator"]').clickAndWait({force: true});
    cy.wait('@getPOSTgraphql1');
    cy.wait('@getPOSTgraphql1');

    cy.validatePillSelectedQuery('Type de variant', ['SNV']);
    cy.validatePillSelectedQuery('Position', ['100000'], 1);
    cy.validateOperatorSelectedQuery('Ou');
    cy.validateTotalSelectedQuery('158K');
    cy.validateTableResultsCount('157 609');
    cy.validateClearAllButton(false);

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql2');
    cy.get('[class*="QueryBar_selected"] [class*="Combiner_operator"]').clickAndWait({force: true});
    cy.wait('@getPOSTgraphql2');
    cy.wait('@getPOSTgraphql2');

    cy.validatePillSelectedQuery('Type de variant', ['SNV']);
    cy.validatePillSelectedQuery('Position', ['100000'], 1);
    cy.validateOperatorSelectedQuery('Et');
    cy.validateTotalSelectedQuery('227');
    cy.validateTableResultsCount('227');
    cy.validateClearAllButton(false);
  });

  it('Supprimer une des pilules d\'une requête avec le X', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_selected"] button[class*="QueryPill_close"]').eq(0).clickAndWait();
    cy.wait('@getPOSTgraphql');
    cy.wait('@getPOSTgraphql');

    cy.validatePillSelectedQuery('Position', ['100000']);
    cy.validateTotalSelectedQuery('242');
    cy.validateTableResultsCount('242');
    cy.validateClearAllButton(false);
  });
});
