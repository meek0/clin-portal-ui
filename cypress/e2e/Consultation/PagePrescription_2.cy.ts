/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitPrescriptionEntityPage(epCHUSJ_ldmCHUSJ.prescriptionId);
});

describe('Page d\'une prescription - Valider les liens disponibles', () => {
  it('Lien Fichiers du tableau Requête (Cas-index)', () => {
    cy.clickAndIntercept('[data-cy="ArchiveLink_'+epCHUSJ_ldmCHUSJ.requestProbId+'"]', 'POST', '**/$graphql*', 1);
    cy.resetColumns(0);
    cy.contains(epCHUSJ_ldmCHUSJ.patientProbId).should('exist');
  });

  it('Lien Analyse (Cas-index)', () => {
    cy.clickAndIntercept('[data-cy="ClinicalInformation_CollapsePanel"] [href*="/bioinformatics-analysis/"]', 'POST', '**/$graphql*', 1);
    cy.contains(`Analyse bioinformatique : ${epCHUSJ_ldmCHUSJ.bioAnalProbId}`).should('exist');
  });

  it('Lien Fichiers du tableau Analyse (Cas-index)', () => {
    cy.clickAndIntercept('[data-cy="ArchiveLink_'+epCHUSJ_ldmCHUSJ.bioAnalProbId+'"]', 'POST', '**/$graphql*', 1);
    cy.resetColumns(0);
    cy.contains(epCHUSJ_ldmCHUSJ.patientProbId).should('exist');
  });

  it('Lien Fichiers du tableau Requête (Mère)', () => {
    cy.clickAndIntercept('[data-cy="ArchiveLink_'+epCHUSJ_ldmCHUSJ.requestMthId+'"]', 'POST', '**/$graphql*', 1);
    cy.resetColumns(0);
    cy.contains(epCHUSJ_ldmCHUSJ.patientMthId).should('exist');
  });

  it('Lien Analyse (Mère)', () => {
    cy.clickAndIntercept('[data-cy="ParentCard_Mère_CollapsePanel"] [href*="/bioinformatics-analysis/"]', 'POST', '**/$graphql*', 1);
    cy.contains(`Analyse bioinformatique : ${epCHUSJ_ldmCHUSJ.bioAnalMthId}`).should('exist');
  });

  it('Lien Fichiers du tableau Analyse (Mère)', () => {
    cy.clickAndIntercept('[data-cy="ArchiveLink_'+epCHUSJ_ldmCHUSJ.bioAnalMthId+'"]', 'POST', '**/$graphql*', 1);
    cy.resetColumns(0);
    cy.contains(epCHUSJ_ldmCHUSJ.patientMthId).should('exist');
  });

  it('Lien Fichiers du tableau Requête (Père)', () => {
    cy.clickAndIntercept('[data-cy="ArchiveLink_'+epCHUSJ_ldmCHUSJ.requestFthId+'"]', 'POST', '**/$graphql*', 1);
    cy.resetColumns(0);
    cy.contains(epCHUSJ_ldmCHUSJ.patientFthId).should('exist');
  });

  it('Lien Analyse (Père)', () => {
    cy.clickAndIntercept('[data-cy="ParentCard_Père_CollapsePanel"] [href*="/bioinformatics-analysis/"]', 'POST', '**/$graphql*', 1);
    cy.contains(`Analyse bioinformatique : ${epCHUSJ_ldmCHUSJ.bioAnalFthId}`).should('exist');
  });

  it('Lien Fichiers du tableau Analyse (Père)', () => {
    cy.clickAndIntercept('[data-cy="ArchiveLink_'+epCHUSJ_ldmCHUSJ.bioAnalFthId+'"]', 'POST', '**/$graphql*', 1);
    cy.resetColumns(0);
    cy.contains(epCHUSJ_ldmCHUSJ.patientFthId).should('exist');
  });
});
