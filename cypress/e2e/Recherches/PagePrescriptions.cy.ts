/// <reference types="Cypress" />
import '../../support/commands';

const epCHUSJ_ldmCHUSJ = JSON.parse(Cypress.env('presc_EP_CHUSJ_LDM_CHUSJ'));

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

describe('Page des prescriptions et des requêtes', () => {
  describe('Rechercher des prescriptions', () => {

    beforeEach(() => {
      cy.visitPrescriptionsPage();

      cy.intercept('**/user').as('getUser');
      cy.get('svg[data-icon="setting"]').click({force: true});
      cy.get('button[class*="ProTablePopoverColumnResetBtn"]').click({force: true});
      cy.wait('@getUser', {timeout: 20*1000});
    });

    it('Par numéro de prescription', () => {
      cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

      cy.get('body').contains('Prescriptions (1)').should('exist');
      cy.get('body').contains(epCHUSJ_ldmCHUSJ.prescriptionId).should('exist');
    });

    it('Par numéro de requête du cas-index', () => {
      cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.requestProbId, {force: true});

      cy.get('body').contains('Prescriptions (1)').should('exist');
      cy.get('body').contains(epCHUSJ_ldmCHUSJ.prescriptionId).should('exist');
    });

    it('Par numéro de dossier du cas-index', () => {
      cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.mrnProb, {force: true});

      cy.get('body').contains('Prescriptions (1)').should('exist');
      cy.get('body').contains(epCHUSJ_ldmCHUSJ.prescriptionId).should('exist');
    });

    it('Par numéro de patient du cas-index', () => {
      cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.patientProbId, {force: true});

      cy.get('body').contains('Prescriptions (1)').should('exist');
      cy.get('body').contains(epCHUSJ_ldmCHUSJ.prescriptionId).should('exist');
    });

    it('Par numéro d\'échantillon du cas-index', () => {
      cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.sampleProbId, {force: true});

      cy.get('body').contains('Prescriptions (1)').should('exist');
      cy.get('body').contains(epCHUSJ_ldmCHUSJ.prescriptionId).should('exist');
    });

    it('Par numéro de requête de la mère', () => {
      cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.requestMthId, {force: true});

      cy.get('body').contains('Prescriptions (1)').should('exist');
      cy.get('body').contains(epCHUSJ_ldmCHUSJ.prescriptionId).should('exist');
    });

    it('Par numéro de dossier de la mère', () => {
      cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.mrnMth, {force: true});

      cy.get('body').contains('Prescriptions (1)').should('exist');
      cy.get('body').contains(epCHUSJ_ldmCHUSJ.prescriptionId).should('exist');
    });

    it('Par numéro de patient de la mère', () => {
      cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.patientMthId, {force: true});

      cy.get('body').contains('Prescriptions (1)').should('exist');
      cy.get('body').contains(epCHUSJ_ldmCHUSJ.prescriptionId).should('exist');
    });

    it('Par numéro d\'échantillon de la mère', () => {
      cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.sampleMthId, {force: true});

      cy.get('body').contains('Prescriptions (1)').should('exist');
      cy.get('body').contains(epCHUSJ_ldmCHUSJ.prescriptionId).should('exist');
    });
  });

  describe('Rechercher des requêtes', () => {

    beforeEach(() => {
      cy.visitPrescriptionsPage();
      cy.get('div[id*="tab-requests"]').click({force: true});

      cy.intercept('**/user').as('getUser');
      cy.get('svg[data-icon="setting"]').eq(1).click({force: true});
      cy.get('button[class*="ProTablePopoverColumnResetBtn"]').click({force: true});
      cy.wait('@getUser', {timeout: 20*1000});
    })

    it('Par numéro de prescription', () => {
      cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

      cy.get('body').contains('Requêtes (3)').should('exist');
      cy.get('body').contains(epCHUSJ_ldmCHUSJ.requestProbId).should('exist');
      cy.get('body').contains(epCHUSJ_ldmCHUSJ.requestMthId).should('exist');
    });

    it('Par numéro de requête du cas-index', () => {
      cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.requestProbId, {force: true});

      cy.get('body').contains('Requêtes (1)').should('exist');
      cy.get('body').contains(epCHUSJ_ldmCHUSJ.requestProbId).should('exist');
    });

    it('Par numéro de dossier du cas-index', () => {
      cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.mrnProb, {force: true});

      cy.get('body').contains('Requêtes (1)').should('exist');
      cy.get('body').contains(epCHUSJ_ldmCHUSJ.requestProbId).should('exist');
    });

    it('Par numéro de patient du cas-index', () => {
      cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.patientProbId, {force: true});

      cy.get('body').contains('Requêtes (1)').should('exist');
      cy.get('body').contains(epCHUSJ_ldmCHUSJ.requestProbId).should('exist');
    });

    it('Par numéro d\'échantillon du cas-index', () => {
      cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.sampleProbId, {force: true});

      cy.get('body').contains('Requêtes (1)').should('exist');
      cy.get('body').contains(epCHUSJ_ldmCHUSJ.requestProbId).should('exist');
    });

    it('Par numéro de requête de la mère', () => {
      cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.requestMthId, {force: true});

      cy.get('body').contains('Requêtes (1)').should('exist');
      cy.get('body').contains(epCHUSJ_ldmCHUSJ.requestMthId).should('exist');
    });

    it('Par numéro de dossier de la mère', () => {
      cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.mrnMth, {force: true});

      cy.get('body').contains('Requêtes (1)').should('exist');
      cy.get('body').contains(epCHUSJ_ldmCHUSJ.requestMthId).should('exist');
    });

    it('Par numéro de patient de la mère', () => {
      cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.patientMthId, {force: true});

      cy.get('body').contains('Requêtes (1)').should('exist');
      cy.get('body').contains(epCHUSJ_ldmCHUSJ.requestMthId).should('exist');
    });

    it('Par numéro d\'échantillon de la mère', () => {
      cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.sampleMthId, {force: true});

      cy.get('body').contains('Requêtes (1)').should('exist');
      cy.get('body').contains(epCHUSJ_ldmCHUSJ.requestMthId).should('exist');
    });
  });
});