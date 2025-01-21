/// <reference types="cypress"/>
import '../../support/commands';
import { oneMinute } from '../../support/utils';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

describe('Page des variants d\'un patient - Filtrer avec les facettes', () => {

  beforeEach(() => {
    cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
  });

  it('Variant - Expand all/Collapse all', () => {
    cy.validateExpandCollapse('Variant');
  });

  it('Recherche par locus - X-123403094-G-A', () => {
    cy.get(`[data-cy="SidebarMenuItem_Variant"]`).clickAndWait({force: true});
    cy.get('[class*="SearchLabel_title"]').contains('Recherche par variant').should('exist'); //data-cy="SearchLabel_Title"

    cy.get('[class*="SearchLabel_tooltipIcon"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true}); //data-cy="SearchLabel_InfoCircleOutlined"
    cy.get('body').contains('Recherche par locus, dbSNP ID et ClinVar ID').should('exist');

    cy.intercept('GET', '**/X-123403094-G-A').as('getRouteMatcher');
    cy.get('[class*="SearchAutocomplete_search"]').eq(0).find('input').type('x-123403094-g-a', {force: true}); //data-cy="SearchAutocomplete_Select"
    cy.wait('@getRouteMatcher');
    cy.waitWhileSpin(oneMinute);

    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').contains('X-123403094-G-A').should('exist'); //data-cy="Search_Dropdown"
    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').eq(0).clickAndWait({force: true}); //data-cy="Search_Dropdown"

    cy.get('[class*="ant-tag"]').contains('X-123403094-G-A').should('exist'); //data-cy="Tag_X-123403094-G-A"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Variant').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('X-123403094-G-A').should('exist');
    cy.validateTableResultsCount(/^1$/);

    cy.get('[data-icon="close-circle"]').clickAndWait({force: true});
    cy.get('[class*="ant-select-show-search"] [class="ant-tag"]').should('not.exist'); //data-cy="Tag_X-123403094-G-A"
  });

  it('Recherche par dbSNP ID - rs138817389', () => {
    cy.get(`[data-cy="SidebarMenuItem_Variant"]`).clickAndWait({force: true});

    cy.intercept('GET', '**/RS138817389').as('getRouteMatcher');
    cy.get('[class*="SearchAutocomplete_search"]').eq(0).find('input').type('RS138817389', {force: true}); //data-cy="SearchAutocomplete_Select"
    cy.wait('@getRouteMatcher');
    cy.waitWhileSpin(oneMinute);

    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').contains('X-123403094-G-A').should('exist'); //data-cy="Search_Dropdown"
    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').eq(0).clickAndWait({force: true}); //data-cy="Search_Dropdown"

    cy.get('[class*="ant-tag"]').contains('X-123403094-G-A').should('exist'); //data-cy="Tag_X-123403094-G-A"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Variant').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('X-123403094-G-A').should('exist');
    cy.validateTableResultsCount(/^1$/);
  });

  it('Recherche par ClinVar ID - 198752', () => {
    cy.get(`[data-cy="SidebarMenuItem_Variant"]`).clickAndWait({force: true});

    cy.intercept('GET', '**/198752').as('getRouteMatcher');
    cy.get('[class*="SearchAutocomplete_search"]').eq(0).find('input').type('198752', {force: true}); //data-cy="SearchAutocomplete_Select"
    cy.wait('@getRouteMatcher');
    cy.waitWhileSpin(oneMinute);

    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').contains('X-123403094-G-A').should('exist'); //data-cy="Search_Dropdown"
    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').eq(0).clickAndWait({force: true}); //data-cy="Search_Dropdown"

    cy.get('[class*="ant-tag"]').contains('X-123403094-G-A').should('exist'); //data-cy="Tag_X-123403094-G-A"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Variant').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('X-123403094-G-A').should('exist');
    cy.validateTableResultsCount(/^1$/);
  });

  it('Variant - Type de variant', () => {
    cy.validateFacetFilter('Variant', 'Type de variant', 'SNV', 'SNV', /^157 594$/);
    cy.validateFacetRank(0, 'Type de variant');
  });

  it('Variant - Conséquences', () => {
    cy.validateFacetFilter('Variant', 'Conséquences', 'Downstream Gene', 'downstream_gene_variant', /^38 150$/);
    cy.validateFacetRank(1, 'Conséquences');
  });

  it('Variant - Référence externe', () => {
    cy.validateFacetFilter('Variant', 'Référence externe', 'No Data', '__missing__', /^\d{3}$/);
    cy.validateFacetRank(2, 'Référence externe');
  });

  it('Variant - Chromosome', () => {
    cy.validateFacetFilter('Variant', 'Chromosome', '19', '19', /^11 806$/);
    cy.validateFacetRank(3, 'Chromosome');
  });

  it('Variant - Position', () => {
    cy.validateFacetNumFilter('Variant', 'Position', '100000', /^242$/);
    cy.validateFacetRank(4, 'Position');
  });
});
