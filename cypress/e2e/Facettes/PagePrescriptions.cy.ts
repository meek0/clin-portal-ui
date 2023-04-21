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
    cy.checkValueFacet(0, 'Approuvée');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('body').contains('Prescriptions (1)').should('exist');
    cy.get('body').contains('Requêtes (3)').should('exist');
  });
  
  it('Statut des requêtes - Complétée', () => {
    cy.checkValueFacet(1, 'Complétée');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('body').contains('Prescriptions (1)').should('exist');
    cy.get('body').contains('Requêtes (3)').should('exist');
  });
  
  it('Analyse - Malignant Hyperthermia (HYPM)', () => {
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
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');

    cy.get('div[class="Filter_facetCollapse__ft2Q2"]').eq(5)
      .find('div[class*="ToggleFilter_radio"]').contains('False')
      .find('[type="radio"]').check({force: true});

    cy.wait('@getPOSTgraphql', {timeout: 5000});
    cy.wait('@getPOSTgraphql', {timeout: 5000});

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('body').contains('Prescriptions (1)').should('exist');
    cy.get('body').contains('Requêtes (3)').should('exist');
  });
});
