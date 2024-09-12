/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

describe('Page des prescriptions et requêtes - Filtrer avec les facettes', () => {

  beforeEach(() => {
    cy.visitPrescriptionsPage();
  });

  it('Priorité - ASAP', () => {
    cy.get('div[class="Filter_facetCollapse__8Ofdg"]').eq(0).contains('Priorité').should('exist');
    cy.checkValueFacet('Priorité', 'asap');

    cy.get('body').contains('Résultats').should('exist');
  });
  
  it('Analyse - Malignant Hyperthermia (HYPM)', () => {
    cy.get('div[class="Filter_facetCollapse__8Ofdg"]').eq(1).contains('Analyse').should('exist');
    cy.checkValueFacet('Analyse', 'HYPM');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('body').contains('Prescriptions 0').should('exist');
    cy.get('body').contains('Requêtes 0').should('exist');
  });

  it('Analyse - Congenital Myopathies (MYOC)', () => {
    cy.checkValueFacet('Analyse', 'MYOC');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('body').contains('Prescriptions 0').should('exist');
    cy.get('body').contains('Requêtes 0').should('exist');
  });

  it('Analyse - Global Developmental Delay / Intellectual Deficiency (Trio) (RGDI)', () => {
    cy.checkValueFacet('Analyse', 'RGDI');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('body').contains('Prescriptions (1)').should('exist');
    cy.get('body').contains('Requêtes (3)').should('exist');
  });

  it('Bioinfo - TN', () => {
    cy.get('div[class="Filter_facetCollapse__8Ofdg"]').eq(2).contains('Bioinfo').should('exist');
    cy.checkValueFacet('Bioinfo', 'TNEBA');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('body').contains('Prescriptions (1)').should('exist');
    cy.get('body').contains('Requêtes (1)').should('exist');
  });

  it('Statut des prescriptions - Approuvée', () => {
    cy.get('div[class="Filter_facetCollapse__8Ofdg"]').eq(3).contains('Statut des prescriptions').should('exist');
    cy.checkValueFacet('Statut des prescriptions', 'active');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('body').contains('Prescriptions (1)').should('exist');
    cy.get('body').contains('Requêtes (3)').should('exist');
  });
  
  it('Statut des requêtes - Complétée', () => {
    cy.get('div[class="Filter_facetCollapse__8Ofdg"]').eq(4).contains('Statut des requêtes').should('exist');
    cy.checkValueFacet('Statut des requêtes', 'completed');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('body').contains('Prescriptions (1)').should('exist');
    cy.get('body').contains('Requêtes (3)').should('exist');
  });
  
  it('Laboratoire (LDM) - LDM-CHUSJ', () => {
    cy.get('div[class="Filter_facetCollapse__8Ofdg"]').eq(5).contains('Laboratoire (LDM)').should('exist');
    cy.checkValueFacet('Laboratoire (LDM)', 'LDM-CHUSJ');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('body').contains('Prescriptions (1)').should('exist');
    cy.get('body').contains('Requêtes (3)').should('exist');
  });

  it('Laboratoire (LDM) - LDM-CHUS', () => {
    cy.checkValueFacet('Laboratoire (LDM)', 'LDM-CHUS');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('body').contains('Prescriptions 0').should('exist');
    cy.get('body').contains('Requêtes 0').should('exist');
  });

  it('Laboratoire (LDM) - LDM-CUSM', () => {
    cy.checkValueFacet('Laboratoire (LDM)', 'LDM-CUSM');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('body').contains('Prescriptions 0').should('exist');
    cy.get('body').contains('Requêtes 0').should('exist');
  });
  
  it('Établissement prescripteur - CHUSJ', () => {
    cy.get('div[class="Filter_facetCollapse__8Ofdg"]').eq(6).contains('Établissement prescripteur').should('exist');
    cy.checkValueFacet('Établissement prescripteur', 'CHUSJ');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('body').contains('Prescriptions (1)').should('exist');
    cy.get('body').contains('Requêtes (3)').should('exist');
  });

  it('Établissement prescripteur - CHUS', () => {
    cy.checkValueFacet('Établissement prescripteur', 'CHUS');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('body').contains('Prescriptions 0').should('exist');
    cy.get('body').contains('Requêtes 0').should('exist');
  });

  it('Établissement prescripteur - CUSM', () => {
    cy.checkValueFacet('Établissement prescripteur', 'CUSM');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('body').contains('Prescriptions 0').should('exist');
    cy.get('body').contains('Requêtes 0').should('exist');
  });
  
  it('Prénatal - False', () => {
    cy.get('div[class="Filter_facetCollapse__8Ofdg"]').eq(7).contains('Prénatal').should('exist');
    cy.checkValueFacet('Prénatal', 'false'); 

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('body').contains('Prescriptions (1)').should('exist');
    cy.get('body').contains('Requêtes (3)').should('exist');
  });
  
  it('Lien de parenté - Cas-index', () => {
    cy.get('div[class="Filter_facetCollapse__8Ofdg"]').eq(8).contains('Lien de parenté').should('exist');
    cy.checkValueFacet('Lien de parenté', 'CasIndex');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('body').contains('Prescriptions (1)').should('exist');
    cy.get('body').contains('Requêtes (1)').should('exist');
  });
});
