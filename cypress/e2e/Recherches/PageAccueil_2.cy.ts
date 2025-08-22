/// <reference types="cypress"/>
import '../../support/commands';

describe('Page d\'accueil - Rechercher des variants', () => {
  let epCHUSJ_ldmCHUSJ: any;
  const setupTest = () => {
    epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visit('/');
  };

  it('Par locus', () => {
    setupTest();
    cy.get('[data-cy="SearchBox"]').type('5-96423719-c-t', {force: true});
    cy.clickAndIntercept('[data-cy="5-96423719-C-T"]', 'POST', '**/graphql', 3);

    cy.get('body').contains('chr5:g.96423719C>T').should('exist');
  });

  it('Par dbSNP', () => {
    setupTest();
    cy.get('[data-cy="SearchBox"]').type('RS456709', {force: true});
    cy.clickAndIntercept('[data-cy="5-96423719-C-T"]', 'POST', '**/graphql', 3);

    cy.get('body').contains('chr5:g.96423719C>T').should('exist');
  });

  it('Par ClinVar', () => {
    setupTest();
    cy.get('[data-cy="SearchBox"]').type('1183539', {force: true});
    cy.clickAndIntercept('[data-cy="5-96423719-C-T"]', 'POST', '**/graphql', 3);

    cy.get('body').contains('chr5:g.96423719C>T').should('exist');
  });
});
