/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitCQPatientPage(epCHUSJ_ldmCHUSJ.prescriptionId);
  cy.get('[data-cy="RadioButton_CouvertureGenique"]').click({force: true});
  cy.resetColumns(0);
});

describe('Page de la couverture génique d\'un patient - Rechercher et filtrer', () => {
  it('Panel MMG et gène MYMK', () => {
    cy.contains('Effacer les filtres').should('not.exist');
    cy.get('[data-cy="SearchBox"]').parent().find('[class="ant-input-clear-icon"]').should('not.exist');
    cy.get('[data-cy="SelectPanel"] [class="ant-select-clear"]').should('not.exist');

    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[data-cy="SelectPanel"]').click();
    cy.clickAndIntercept('[data-cy="MMG"]', 'POST', '*/graphql', 1);
    cy.typeAndIntercept('[data-cy="SearchBox"]', 'MYMK', 'POST', '*/graphql', 4);

    cy.validateTableResultsCount(/^1 Résultat$/);
    cy.get('[data-cy="AverageCoverage"]').contains('436.65').should('exist');

    cy.contains('Effacer les filtres').should('exist');
    cy.get('[data-cy="SearchBox"]').parent().find('[class="ant-input-clear-icon"]').should('exist');
    cy.get('[data-cy="SelectPanel"] [class="ant-select-clear"]').should('exist');

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.contains('Effacer les filtres').click({force:true});
    cy.wait('@getPOSTgraphql');

    cy.contains('Effacer les filtres').should('not.exist');
    cy.get('[data-cy="SearchBox"]').parent().find('[class="ant-input-clear-icon"]').should('not.exist');
    cy.get('[data-cy="SelectPanel"] [class="ant-select-clear"]').should('not.exist');

    cy.validateTableResultsCount('19 574');
    cy.get('[data-cy="AverageCoverage"]').contains('442.02').should('exist');
  });
});
