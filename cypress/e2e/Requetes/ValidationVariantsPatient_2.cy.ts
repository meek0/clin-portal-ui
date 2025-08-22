/// <reference types="cypress"/>
import '../../support/commands';

describe('Page des variants d\'un patient - Requêtes', () => {
  let epCHUSJ_ldmCHUSJ: any;
  const setupTest = () => {
    epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3, '41598abd-42ea-4242-b0ef-d6809264e277');
  };

  it('Validation Q1 - Facette numérique ou No Data OU Facette numérique ou No Data', () => {
    setupTest();
    cy.validateTotalSelectedQuery('24.1K');
    cy.validateTableResultsCount('24 101');
  });

  it('Validation Q2 - Facette standard OU Facette standard', () => {
    setupTest();
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(1).clickAndWait();
    cy.wait('@getPOSTgraphql');

    cy.validateTotalSelectedQuery(/3(,| )113/);
    cy.validateTableResultsCount('3 113');
  });

  it('Validation Q3 - Q1 OU Q2', () => {
    setupTest();
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(2).clickAndWait();
    cy.wait('@getPOSTgraphql');

    cy.validateTotalSelectedQuery('27.2K');
    cy.validateTableResultsCount('27 213');
  });

  it('Validation Q4 - Facette numérique ou No Data ET Facette standard', () => {
    setupTest();
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(3).clickAndWait();
    cy.wait('@getPOSTgraphql');

    cy.validateTotalSelectedQuery(/1(,| )517/);
    cy.validateTableResultsCount('1 517');
  });

  it('Validation Q5 - Facette numérique ou No Data ET Facette numérique ou No Data', () => {
    setupTest();
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(4).clickAndWait();
    cy.wait('@getPOSTgraphql');

    cy.validateTotalSelectedQuery('184');
    cy.validateTableResultsCount('184');
  });

  it('Validation Q6 - Q4 ET Q5', () => {
    setupTest();
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(5).clickAndWait();
    cy.wait('@getPOSTgraphql');

    cy.validateTotalSelectedQuery('9');
    cy.validateTableResultsCount('9');
  });

  it('Validation Q7 - Q3 OU Q6 OU Facette numérique ou No Data', () => {
    setupTest();
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(6).clickAndWait();
    cy.wait('@getPOSTgraphql');

    cy.validateTotalSelectedQuery('49.5K');
    cy.validateTableResultsCount('49 476');
  });

  it('Validation Q8 - Facette numérique ou No Data', () => {
    setupTest();
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(7).clickAndWait();
    cy.wait('@getPOSTgraphql');

    cy.validateTotalSelectedQuery('172K');
    cy.validateTableResultsCount('172 491');
  });

  it('Validation Q9 - Q7 OU Q8', () => {
    setupTest();
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(8).clickAndWait();
    cy.wait('@getPOSTgraphql');

    cy.validateTotalSelectedQuery('184K');
    cy.validateTableResultsCount('184 077');
  });
});
