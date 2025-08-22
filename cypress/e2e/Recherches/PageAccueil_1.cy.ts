/// <reference types="cypress"/>
import '../../support/commands';

describe('Page d\'accueil - Rechercher des prescriptions', () => {
  let epCHUSJ_ldmCHUSJ: any;
  const setupTest = () => {
    epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visit('/');
  };

  it('Par numéro de prescription', () => {
    setupTest();
    cy.get('[data-cy="PrescriptionAutoComplete"]').type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});
    cy.clickAndIntercept('[data-cy="'+epCHUSJ_ldmCHUSJ.prescriptionId+'"]', 'POST', '**/$graphql*', 1);

    cy.get('body').contains(epCHUSJ_ldmCHUSJ.lastNameProb+' '+epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
  });

  it('Par numéro de requête du cas-index', () => {
    setupTest();
    cy.get('[data-cy="PrescriptionAutoComplete"]').type(epCHUSJ_ldmCHUSJ.requestProbId, {force: true});
    cy.clickAndIntercept('[data-cy="'+epCHUSJ_ldmCHUSJ.prescriptionId+'"]', 'POST', '**/$graphql*', 1);

    cy.get('body').contains(epCHUSJ_ldmCHUSJ.lastNameProb+' '+epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
  });

  it('Par numéro de dossier du cas-index', () => {
    setupTest();
    cy.get('[data-cy="PrescriptionAutoComplete"]').type(epCHUSJ_ldmCHUSJ.mrnProb, {force: true});
    cy.clickAndIntercept('[data-cy="'+epCHUSJ_ldmCHUSJ.prescriptionId+'"]', 'POST', '**/$graphql*', 1);

    cy.get('body').contains(epCHUSJ_ldmCHUSJ.lastNameProb+' '+epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
  });

  it('Par numéro de patient du cas-index', () => {
    setupTest();
    cy.get('[data-cy="PrescriptionAutoComplete"]').type(epCHUSJ_ldmCHUSJ.patientProbId, {force: true});
    cy.clickAndIntercept('[data-cy="'+epCHUSJ_ldmCHUSJ.prescriptionId+'"]', 'POST', '**/$graphql*', 1);

    cy.get('body').contains(epCHUSJ_ldmCHUSJ.lastNameProb+' '+epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
  });

  it('Par numéro d\'échantillon du cas-index', () => {
    setupTest();
    cy.get('[data-cy="PrescriptionAutoComplete"]').type(epCHUSJ_ldmCHUSJ.sampleProbId, {force: true});
    cy.clickAndIntercept('[data-cy="'+epCHUSJ_ldmCHUSJ.prescriptionId+'"]', 'POST', '**/$graphql*', 1);

    cy.get('body').contains(epCHUSJ_ldmCHUSJ.lastNameProb+' '+epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
  });

  it('Par numéro de requête de la mère', () => {
    setupTest();
    cy.get('[data-cy="PrescriptionAutoComplete"]').type(epCHUSJ_ldmCHUSJ.requestMthId, {force: true});
    cy.clickAndIntercept('[data-cy="'+epCHUSJ_ldmCHUSJ.prescriptionId+'"]', 'POST', '**/$graphql*', 1);

    cy.get('body').contains(epCHUSJ_ldmCHUSJ.lastNameProb+' '+epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
  });

  it('Par numéro de dossier de la mère', () => {
    setupTest();
    cy.get('[data-cy="PrescriptionAutoComplete"]').type(epCHUSJ_ldmCHUSJ.mrnMth.toLowerCase(), {force: true});
    cy.clickAndIntercept('[data-cy="'+epCHUSJ_ldmCHUSJ.prescriptionId+'"]', 'POST', '**/$graphql*', 1);

    cy.get('body').contains(epCHUSJ_ldmCHUSJ.lastNameProb+' '+epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
  });

  it('Par numéro de patient de la mère', () => {
    setupTest();
    cy.get('[data-cy="PrescriptionAutoComplete"]').type(epCHUSJ_ldmCHUSJ.patientMthId, {force: true});
    cy.clickAndIntercept('[data-cy="'+epCHUSJ_ldmCHUSJ.prescriptionId+'"]', 'POST', '**/$graphql*', 1);

    cy.get('body').contains(epCHUSJ_ldmCHUSJ.lastNameProb+' '+epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
  });

  it('Par numéro d\'échantillon de la mère', () => {
    setupTest();
    cy.get('[data-cy="PrescriptionAutoComplete"]').type(epCHUSJ_ldmCHUSJ.sampleMthId, {force: true});
    cy.clickAndIntercept('[data-cy="'+epCHUSJ_ldmCHUSJ.prescriptionId+'"]', 'POST', '**/$graphql*', 1);

    cy.get('body').contains(epCHUSJ_ldmCHUSJ.lastNameProb+' '+epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
  });

  it('Par numéro de requête du père', () => {
    setupTest();
    cy.get('[data-cy="PrescriptionAutoComplete"]').type(epCHUSJ_ldmCHUSJ.requestFthId, {force: true});
    cy.clickAndIntercept('[data-cy="'+epCHUSJ_ldmCHUSJ.prescriptionId+'"]', 'POST', '**/$graphql*', 1);

    cy.get('body').contains(epCHUSJ_ldmCHUSJ.lastNameProb+' '+epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
  });

  it('Par numéro de dossier du père', () => {
    setupTest();
    cy.get('[data-cy="PrescriptionAutoComplete"]').type(epCHUSJ_ldmCHUSJ.mrnFth, {force: true});
    cy.clickAndIntercept('[data-cy="'+epCHUSJ_ldmCHUSJ.prescriptionId+'"]', 'POST', '**/$graphql*', 1);

    cy.get('body').contains(epCHUSJ_ldmCHUSJ.lastNameProb+' '+epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
  });

  it('Par numéro de patient du père', () => {
    setupTest();
    cy.get('[data-cy="PrescriptionAutoComplete"]').type(epCHUSJ_ldmCHUSJ.patientFthId, {force: true});
    cy.clickAndIntercept('[data-cy="'+epCHUSJ_ldmCHUSJ.prescriptionId+'"]', 'POST', '**/$graphql*', 1);

    cy.get('body').contains(epCHUSJ_ldmCHUSJ.lastNameProb+' '+epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
  });

  it('Par numéro d\'échantillon du père', () => {
    setupTest();
    cy.get('[data-cy="PrescriptionAutoComplete"]').type(epCHUSJ_ldmCHUSJ.sampleFthId, {force: true});
    cy.clickAndIntercept('[data-cy="'+epCHUSJ_ldmCHUSJ.prescriptionId+'"]', 'POST', '**/$graphql*', 1);

    cy.get('body').contains(epCHUSJ_ldmCHUSJ.lastNameProb+' '+epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
  });

  it('Par numéro de lot', () => {
    setupTest();
    cy.get('[data-cy="PrescriptionAutoComplete"]').type('2_data_to_import', {force: true});
    cy.clickAndIntercept('[href*="/prescription/entity/"]', 'POST', '**/$graphql*', 1);

    cy.get('body').contains('BEAULIEU Zoe').should('exist');
  });
});
