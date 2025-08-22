/// <reference types="cypress"/>
import '../../support/commands';

describe('Page des variants d\'un patient - Requêtes', () => {
  let epCHUSJ_ldmCHUSJ: any;
  const setupTest = () => {
    epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3, 'd1de057e-f4e7-4245-97e0-6bab9070e799');
  };

  it('Validation Facette numérique ou No Data', () => {
    setupTest();
    cy.validateTotalSelectedQuery('156K');
    cy.validateTableResultsCount('155 549');
  });

  it('Validation Facette numérique OU Facette standard', () => {
    setupTest();
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(1).clickAndWait();
    cy.wait('@getPOSTgraphql');

    cy.validateTotalSelectedQuery('184K');
    cy.validateTableResultsCount('183 998');
  });

  it('Validation Facette numérique ou No Data ET Facette standard', () => {
    setupTest();
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(2).clickAndWait();
    cy.wait('@getPOSTgraphql');

    cy.validateTotalSelectedQuery(/1(,| )517/);
    cy.validateTableResultsCount('1 517');
  });

  it('Validation Facette standard (Any of)', () => {
    setupTest();
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(3).clickAndWait();
    cy.wait('@getPOSTgraphql');

    cy.validateTotalSelectedQuery('176K');
    cy.validateTableResultsCount('175 938');
  });

  it('Validation Facette standard (All of)', () => {
    setupTest();
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(4).clickAndWait();
    cy.wait('@getPOSTgraphql');

    cy.validateTotalSelectedQuery('0');
    cy.validateTableResultsCount('Aucun résultat');
  });

  it('Validation Facette standard (None of)', () => {
    setupTest();
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(5).clickAndWait();
    cy.wait('@getPOSTgraphql');

    cy.validateTotalSelectedQuery(/8(,| )139/);
    cy.validateTableResultsCount('8 139');
  });

  it('Validation Facette standard (None of) ET Facette numérique', () => {
    setupTest();
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(6).clickAndWait();
    cy.wait('@getPOSTgraphql');

    cy.validateTotalSelectedQuery('150');
    cy.validateTableResultsCount('149 966');
  });
});
