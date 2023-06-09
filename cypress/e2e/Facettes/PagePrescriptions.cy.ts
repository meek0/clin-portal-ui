/// <reference types="Cypress" />
import '../../support/commands';

const epCHUSJ_ldmCHUSJ = JSON.parse(Cypress.env('presc_EP_CHUSJ_LDM_CHUSJ'));

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

describe('Page des prescriptions et requêtes - Filtrer avec les facettes', () => {

  beforeEach(() => {
    cy.visitPrescriptionsPage();
  });

  it('Statut - Approuvée', () => {
    cy.get('div[class="Filter_facetCollapse__ft2Q2"]').eq(0).contains('Statut').should('exist');
    cy.checkValueFacet(0, 'Approuvée');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('body').contains('Prescriptions (1)').should('exist');
    cy.get('body').contains('Requêtes (3)').should('exist');
  });
  
  it('Statut des requêtes - Complétée', () => {
    cy.get('div[class="Filter_facetCollapse__ft2Q2"]').eq(1).contains('Statut des requêtes').should('exist');
    cy.checkValueFacet(1, 'Complétée');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('body').contains('Prescriptions (1)').should('exist');
    cy.get('body').contains('Requêtes (3)').should('exist');
  });
  
  it('Analyse - Malignant Hyperthermia (HYPM)', () => {
    cy.get('div[class="Filter_facetCollapse__ft2Q2"]').eq(2).contains('Analyse').should('exist');
    cy.checkValueFacet(2, 'HYPM');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('body').contains('Prescriptions 0').should('exist');
    cy.get('body').contains('Requêtes 0').should('exist');
  });

  it('Analyse - Congenital Myopathies (MYOC)', () => {
    cy.checkValueFacet(2, 'MYOC');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('body').contains('Prescriptions 0').should('exist');
    cy.get('body').contains('Requêtes 0').should('exist');
  });

  it('Analyse - Global Developmental Delay / Intellectual Deficiency (Trio) (RGDI)', () => {
    cy.checkValueFacet(2, 'RGDI');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('body').contains('Prescriptions (1)').should('exist');
    cy.get('body').contains('Requêtes (3)').should('exist');
  });
  
  it('Laboratoire (LDM) - LDM-CHUSJ', () => {
    cy.get('div[class="Filter_facetCollapse__ft2Q2"]').eq(3).contains('Laboratoire (LDM)').should('exist');
    cy.checkValueFacet(3, 'LDM-CHUSJ');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('body').contains('Prescriptions (1)').should('exist');
    cy.get('body').contains('Requêtes (3)').should('exist');
  });

  it('Laboratoire (LDM) - LDM-CHUS', () => {
    cy.checkValueFacet(3, /^LDM-CHUS$/);

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('body').contains('Prescriptions 0').should('exist');
    cy.get('body').contains('Requêtes 0').should('exist');
  });

  it('Laboratoire (LDM) - LDM-CUSM', () => {
    cy.checkValueFacet(3, 'LDM-CUSM');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('body').contains('Prescriptions 0').should('exist');
    cy.get('body').contains('Requêtes 0').should('exist');
  });
  
  it('Établissement prescripteur - CHUSJ', () => {
    cy.get('div[class="Filter_facetCollapse__ft2Q2"]').eq(4).contains('Établissement prescripteur').should('exist');
    cy.checkValueFacet(4, 'CHUSJ');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('body').contains('Prescriptions (1)').should('exist');
    cy.get('body').contains('Requêtes (3)').should('exist');
  });

  it('Établissement prescripteur - CHUS', () => {
    cy.checkValueFacet(4, /^CHUS$/);

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('body').contains('Prescriptions 0').should('exist');
    cy.get('body').contains('Requêtes 0').should('exist');
  });

  it('Établissement prescripteur - CUSM', () => {
    cy.checkValueFacet(4, 'CUSM');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('body').contains('Prescriptions 0').should('exist');
    cy.get('body').contains('Requêtes 0').should('exist');
  });
  
  it('Prénatal - False', () => {
    cy.get('div[class="Filter_facetCollapse__ft2Q2"]').eq(5).contains('Prénatal').should('exist');
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');

    cy.get('div[class="Filter_facetCollapse__ft2Q2"]').eq(5)
      .find('div[class*="CheckboxFilter_checkboxFilterItem"]').contains('False')
      .find('[type="checkbox"]').check({force: true});

    cy.wait('@getPOSTgraphql', {timeout: 5000});
    cy.wait('@getPOSTgraphql', {timeout: 5000});

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('body').contains('Prescriptions (1)').should('exist');
    cy.get('body').contains('Requêtes (3)').should('exist');
  });
});
