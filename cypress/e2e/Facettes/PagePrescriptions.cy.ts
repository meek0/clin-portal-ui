/// <reference types="cypress"/>
import '../../support/commands';

describe('Page des prescriptions et requêtes - Filtrer avec les facettes', () => {
  let epCHUSJ_ldmCHUSJ: any;
  const setupTest = () => {
    epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitPrescriptionsPage();
  };

  it('Priorité - ASAP', () => {
    setupTest();
    cy.get('div[class="Filter_facetCollapse__8Ofdg"]').eq(0).contains('Priorité').should('exist');
    cy.checkValueFacet('Priorité', 'asap');

    cy.validateTableResultsCount('Résultat');
  });
  
  it('Analyse - Malignant Hyperthermia (HYPM)', () => {
    setupTest();
    cy.get('div[class="Filter_facetCollapse__8Ofdg"]').eq(1).contains('Analyse').should('exist');
    cy.checkValueFacet('Analyse', 'HYPM');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('[data-node-key="prescriptions"]').contains('Prescriptions 0').should('exist');
    cy.get('[data-node-key="requests"]').contains('Requêtes 0').should('exist');
  });
  
  it('Projet de recherche - Care4Rare-Expand', () => {
    setupTest();
    cy.get('div[class="Filter_facetCollapse__8Ofdg"]').eq(2).contains('Projet de recherche').should('exist');
    cy.checkValueFacet('Projet de recherche', 'Care4Rare-Expand');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('[data-node-key="prescriptions"]').contains('Prescriptions 0').should('exist');
    cy.get('[data-node-key="requests"]').contains('Requêtes 0').should('exist');
  });

  it('Analyse - Congenital Myopathies (MYOC)', () => {
    setupTest();
    cy.checkValueFacet('Analyse', 'MYOC');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('[data-node-key="prescriptions"]').contains('Prescriptions 0').should('exist');
    cy.get('[data-node-key="requests"]').contains('Requêtes 0').should('exist');
  });

  it('Analyse - Global Developmental Delay / Intellectual Deficiency (Trio) (RGDI)', () => {
    setupTest();
    cy.checkValueFacet('Analyse', 'RGDI');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('[data-node-key="prescriptions"]').contains('Prescriptions (1)').should('exist');
    cy.get('[data-node-key="requests"]').contains('Requêtes (3)').should('exist');
  });

  it('Bioinfo - TN', () => {
    setupTest();
    cy.get('div[class="Filter_facetCollapse__8Ofdg"]').eq(3).contains('Bioinfo').should('exist');
    cy.checkValueFacet('Bioinfo', 'TNEBA');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('[data-node-key="prescriptions"]').contains('Prescriptions (1)').should('exist');
    cy.get('[data-node-key="requests"]').contains('Requêtes (1)').should('exist');
  });

  it('Statut des prescriptions - Complétée', () => {
    setupTest();
    cy.get('div[class="Filter_facetCollapse__8Ofdg"]').eq(4).contains('Statut des prescriptions').should('exist');
    cy.checkValueFacet('Statut des prescriptions', 'active');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('[data-node-key="prescriptions"]').contains('Prescriptions (1)').should('exist');
    cy.get('[data-node-key="requests"]').contains('Requêtes (3)').should('exist');
  });
  
  it('Statut des requêtes - Complétée', () => {
    setupTest();
    cy.get('div[class="Filter_facetCollapse__8Ofdg"]').eq(5).contains('Statut des requêtes').should('exist');
    cy.checkValueFacet('Statut des requêtes', 'completed');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('[data-node-key="prescriptions"]').contains('Prescriptions (1)').should('exist');
    cy.get('[data-node-key="requests"]').contains('Requêtes (3)').should('exist');
  });
  
  it('Laboratoire (LDM) - LDM-CHUSJ', () => {
    setupTest();
    cy.get('div[class="Filter_facetCollapse__8Ofdg"]').eq(6).contains('Laboratoire (LDM)').should('exist');
    cy.checkValueFacet('Laboratoire (LDM)', 'LDM-CHUSJ');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('[data-node-key="prescriptions"]').contains('Prescriptions (1)').should('exist');
    cy.get('[data-node-key="requests"]').contains('Requêtes (3)').should('exist');
  });

  it('Laboratoire (LDM) - LDM-CHUS', () => {
    setupTest();
    cy.checkValueFacet('Laboratoire (LDM)', 'LDM-CHUS');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('[data-node-key="prescriptions"]').contains('Prescriptions 0').should('exist');
    cy.get('[data-node-key="requests"]').contains('Requêtes 0').should('exist');
  });

  it('Laboratoire (LDM) - LDM-CUSM', () => {
    setupTest();
    cy.checkValueFacet('Laboratoire (LDM)', 'LDM-CUSM');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('[data-node-key="prescriptions"]').contains('Prescriptions 0').should('exist');
    cy.get('[data-node-key="requests"]').contains('Requêtes 0').should('exist');
  });
  
  it('Établissement prescripteur - CHUSJ', () => {
    setupTest();
    cy.get('div[class="Filter_facetCollapse__8Ofdg"]').eq(7).contains('Établissement prescripteur').should('exist');
    cy.checkValueFacet('Établissement prescripteur', 'CHUSJ');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('[data-node-key="prescriptions"]').contains('Prescriptions (1)').should('exist');
    cy.get('[data-node-key="requests"]').contains('Requêtes (3)').should('exist');
  });

  it('Établissement prescripteur - CHUS', () => {
    setupTest();
    cy.checkValueFacet('Établissement prescripteur', 'CHUS');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('[data-node-key="prescriptions"]').contains('Prescriptions 0').should('exist');
    cy.get('[data-node-key="requests"]').contains('Requêtes 0').should('exist');
  });

  it('Établissement prescripteur - CUSM', () => {
    setupTest();
    cy.checkValueFacet('Établissement prescripteur', 'CUSM');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('[data-node-key="prescriptions"]').contains('Prescriptions 0').should('exist');
    cy.get('[data-node-key="requests"]').contains('Requêtes 0').should('exist');
  });
  
  it('Prénatal - False', () => {
    setupTest();
    cy.get('div[class="Filter_facetCollapse__8Ofdg"]').eq(8).contains('Prénatal').should('exist');
    cy.checkValueFacet('Prénatal', 'false'); 

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('[data-node-key="prescriptions"]').contains('Prescriptions (1)').should('exist');
    cy.get('[data-node-key="requests"]').contains('Requêtes (3)').should('exist');
  });
  
  it('Lien de parenté - Cas-index', () => {
    setupTest();
    cy.get('div[class="Filter_facetCollapse__8Ofdg"]').eq(9).contains('Lien de parenté').should('exist');
    cy.checkValueFacet('Lien de parenté', 'CasIndex');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('[data-node-key="prescriptions"]').contains('Prescriptions (1)').should('exist');
    cy.get('[data-node-key="requests"]').contains('Requêtes (1)').should('exist');
  });
});
