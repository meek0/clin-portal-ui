/// <reference types="cypress"/>
import '../../support/commands';
import { oneMinute } from '../../support/utils';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
  cy.get(`[data-cy="SidebarMenuItem_Gène"]`).clickAndWait({force: true});
});

describe('Page des CNVs d\'un patient - Gène', () => {
  it('Recherche par symbole - CFHR1', () => {
    cy.get('[class*="SearchLabel_title"]').contains('Recherche par gène').should('exist'); //data-cy="SearchLabel_Title"

    cy.get('[class*="SearchLabel_tooltipIcon"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true}); //data-cy="SearchLabel_InfoCircleOutlined"
    cy.get('body').contains('Recherche par symbole, alias et Ensembl ID').should('exist');

    cy.intercept('GET', '**/CFHR1').as('getRouteMatcher');
    cy.get('[class*="SearchAutocomplete_search"]').eq(0).find('input').type('cfhr1', {force: true}); //data-cy="SearchAutocomplete_Select"
    cy.wait('@getRouteMatcher');
    cy.waitWhileSpin(oneMinute);

    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').contains('CFHR1').should('exist'); //data-cy="Search_Dropdown"
    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').eq(0).clickAndWait({force: true}); //data-cy="Search_Dropdown"

    cy.get('[class*="ant-tag"]').contains('CFHR1').should('exist'); //data-cy="Tag_CFHR1"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Gène').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('CFHR1').should('exist');
    cy.validateTableResultsCount(/^1$/);

    cy.get('[data-icon="close-circle"]').clickAndWait({force: true});
    cy.get('[class*="ant-select-show-search"] [class="ant-tag"]').should('not.exist'); //data-cy="Tag_CFHR1"
  });

  it('Recherche par alias - FHR1', () => {
    cy.intercept('GET', '**/FHR1').as('getRouteMatcher');
    cy.get('[class*="SearchAutocomplete_search"]').eq(0).find('input').type('fhr1', {force: true}); //data-cy="SearchAutocomplete_Select"
    cy.wait('@getRouteMatcher');
    cy.waitWhileSpin(oneMinute);

    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').contains('CFHR1').should('exist'); //data-cy="Search_Dropdown"
    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').eq(0).clickAndWait({force: true}); //data-cy="Search_Dropdown"

    cy.get('[class*="ant-tag"]').contains('CFHR1').should('exist'); //data-cy="Tag_CFHR1"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Gène').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('CFHR1').should('exist');
    cy.validateTableResultsCount(/^1$/);
  });

  it('Recherche par Ensembl ID - ENSG00000244414', () => {
    cy.intercept('GET', '**/ENSG00000244414').as('getRouteMatcher');
    cy.get('[class*="SearchAutocomplete_search"]').eq(0).find('input').type('ensg00000244414', {force: true}); //data-cy="SearchAutocomplete_Select"
    cy.wait('@getRouteMatcher');
    cy.waitWhileSpin(oneMinute);

    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').contains('CFHR1').should('exist'); //data-cy="Search_Dropdown"
    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').eq(0).clickAndWait({force: true}); //data-cy="Search_Dropdown"

    cy.get('[class*="ant-tag"]').contains('CFHR1').should('exist'); //data-cy="Tag_CFHR1"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Gène').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('CFHR1').should('exist');
    cy.validateTableResultsCount(/^1$/);
  });
});
