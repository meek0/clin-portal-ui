/// <reference types="cypress"/>
import '../../support/commands';

describe('Page des prescriptions et requêtes - Consultation du tableau des prescriptions', () => {
  let epCHUSJ_ldmCHUSJ: any;
  const setupTest = () => {
    epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));

    cy.visitPrescriptionsPage();
    cy.checkValueFacet('Statut des prescriptions', 'active');
    cy.checkValueFacet('Analyse', 'MYOC');
    cy.checkValueFacet('Analyse', 'HYPM');

    cy.resetColumns(0);

    cy.showColumn('Modifiée le', 0);
    cy.showColumn('Projet', 0);
    cy.showColumn('Requérant', 0);
    cy.showColumn('Prénatal', 0);
    cy.showColumn('Dossier', 0);

    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', 'MRN-', 'POST', '**/graphql', 16);
  };

  it('Valider les fonctionnalités du tableau - Tri Prescription', () => {
    setupTest();
    cy.sortTableAndIntercept('Prescription', 3);
    cy.validateTableFirstRow('MRN-283791', 15, true);
    cy.sortTableAndIntercept('Prescription', 3);
    cy.validateTableFirstRow('MRN-283798', 15, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Patient', () => {
    setupTest();
    cy.sortTableAndIntercept('Patient', 3);
    cy.validateTableFirstRow('MRN-283791', 15, true);
    cy.sortTableAndIntercept('Patient', 3);
    cy.validateTableFirstRow('MRN-283900', 15, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Priorité', () => {
    setupTest();
    cy.sortTableAndIntercept('Priorité', 3);
    cy.validateTableFirstRow('Routine', 4, true);
    cy.sortTableAndIntercept('Priorité', 3);
    cy.validateTableFirstRow(/^(-|(?!-).*)$/, 4, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Statut', () => {
    setupTest();
    cy.sortTableAndIntercept('Statut', 3);
    cy.validateTableFirstRow('Complétée', 5, true);
    cy.sortTableAndIntercept('Statut', 3);
    cy.validateTableFirstRow('Complétée', 5, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Créée le', () => {
    setupTest();
    cy.sortTableAndIntercept('Créée le', 3);
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.stampDate.substring(0, 4), 6, true);
    cy.sortTableAndIntercept('Créée le', 3);
    cy.validateTableFirstRow(/^\d{4}-\d{2}-\d{2}$/, 6, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Modifiée le', () => {
    setupTest();
    cy.sortTableAndIntercept('Modifiée le', 3);
    cy.validateTableFirstRow(/^\d{4}-\d{2}-\d{2}$/, 7, true);
    cy.sortTableAndIntercept('Modifiée le', 3);
    cy.validateTableFirstRow(/^\d{4}-\d{2}-\d{2}$/, 7, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Analyse', () => {
    setupTest();
    cy.sortTableAndIntercept('Analyse', 3);
    cy.validateTableFirstRow('HYPM', 8, true);
    cy.sortTableAndIntercept('Analyse', 3);
    cy.validateTableFirstRow('MYOC', 8, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Projet', () => {
    setupTest();
    cy.sortTableAndIntercept('Projet', 3);
    cy.validateTableFirstRow('-', 9, true);
    cy.sortTableAndIntercept('Projet', 3);
    cy.validateTableFirstRow('-', 9, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Bioinfo', () => {
    setupTest();
    cy.sortTableAndIntercept('Bioinfo', 3);
    cy.validateTableFirstRow('G', 10, true);
    cy.sortTableAndIntercept('Bioinfo', 3);
    cy.validateTableFirstRow('G', 10, true);
  });

  it('Valider les fonctionnalités du tableau - Tri LDM', () => {
    setupTest();
    cy.sortTableAndIntercept('LDM', 3);
    cy.validateTableFirstRow('LDM-CHUS', 11, true);
    cy.sortTableAndIntercept('LDM', 3);
    cy.validateTableFirstRow('LDM-CHUSJ', 11, true);
  });

  it('Valider les fonctionnalités du tableau - Tri EP', () => {
    setupTest();
    cy.sortTableAndIntercept('EP', 3);
    cy.validateTableFirstRow('CHUS', 12, true);
    cy.sortTableAndIntercept('EP', 3);
    cy.validateTableFirstRow('CUSM', 12, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Requérant', () => {
    setupTest();
    cy.sortTableAndIntercept('Requérant', 3);
    cy.validateTableFirstRow('-', 13, true);
    cy.sortTableAndIntercept('Requérant', 3);
    cy.validateTableFirstRow('-', 13, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Prénatal', () => {
    setupTest();
    cy.sortTableAndIntercept('Prénatal', 3);
    cy.validateTableFirstRow('Non', 14, true);
    cy.sortTableAndIntercept('Prénatal', 3);
    cy.validateTableFirstRow('Non', 14, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Dossier', () => {
    setupTest();
    cy.sortTableAndIntercept('Dossier', 3);
    cy.validateTableFirstRow('MRN-283791', 15, true);
    cy.sortTableAndIntercept('Dossier', 3);
    cy.validateTableFirstRow('MRN-283900', 15, true);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    setupTest();
    cy.sortTableAndIntercept('EP', 3);
    cy.sortTableAndIntercept('Dossier', 3);
    cy.validateTableFirstRow('MRN-283804', 15, true);
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    setupTest();
    cy.validatePaging('102', 0);
  });
});
