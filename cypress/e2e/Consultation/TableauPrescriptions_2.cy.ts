/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));

  cy.visitPrescriptionsPage();
  cy.checkValueFacet('Statut des prescriptions', 'active');
  cy.checkValueFacet('Analyse', 'MYOC');
  cy.checkValueFacet('Analyse', 'HYPM');

  cy.resetColumns(0);

  cy.showColumn('Modifiée le', 0);
  cy.showColumn('Requérant', 0);
  cy.showColumn('Prénatal', 0);
  cy.showColumn('Dossier', 0);
});

describe('Page des prescriptions et requêtes - Consultation du tableau des prescriptions', () => {
  it('Valider les fonctionnalités du tableau - Tri Prescription', () => {
    cy.sortTableAndIntercept('Prescription', 3);
    cy.validateTableFirstRow('MRN-283791', 14, true);
    cy.sortTableAndIntercept('Prescription', 3);
    cy.validateTableFirstRow('MRN-283798', 14, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Patient', () => {
    cy.sortTableAndIntercept('Patient', 3);
    cy.validateTableFirstRow('MRN-283791', 14, true);
    cy.sortTableAndIntercept('Patient', 3);
    cy.validateTableFirstRow('MRN-283900', 14, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Priorité', () => {
    cy.sortTableAndIntercept('Priorité', 3);
    cy.validateTableFirstRow('-', 4, true);
    cy.sortTableAndIntercept('Priorité', 3);
    cy.validateTableFirstRow(/^(-|Routine|ASAP)$/, 4, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Statut', () => {
    cy.sortTableAndIntercept('Statut', 3);
    cy.validateTableFirstRow('Approuvée', 5, true);
    cy.sortTableAndIntercept('Statut', 3);
    cy.validateTableFirstRow('Approuvée', 5, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Créée le', () => {
    cy.sortTableAndIntercept('Créée le', 3);
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.stampDate.substring(0, 7), 6, true);
    cy.sortTableAndIntercept('Créée le', 3);
    cy.validateTableFirstRow(/^\d{4}-\d{2}-\d{2}$/, 6, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Modifiée le', () => {
    cy.sortTableAndIntercept('Modifiée le', 3);
    cy.validateTableFirstRow(/^\d{4}-\d{2}-\d{2}$/, 7, true);
    cy.sortTableAndIntercept('Modifiée le', 3);
    cy.validateTableFirstRow(/^\d{4}-\d{2}-\d{2}$/, 7, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Analyse', () => {
    cy.sortTableAndIntercept('Analyse', 3);
    cy.validateTableFirstRow('HYPM', 8, true);
    cy.sortTableAndIntercept('Analyse', 3);
    cy.validateTableFirstRow('MYOC', 8, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Bioinfo', () => {
    cy.sortTableAndIntercept('Bioinfo', 3);
    cy.validateTableFirstRow('G', 9, true);
    cy.sortTableAndIntercept('Bioinfo', 3);
    cy.validateTableFirstRow('G', 9, true);
  });

  it('Valider les fonctionnalités du tableau - Tri LDM', () => {
    cy.sortTableAndIntercept('LDM', 3);
    cy.validateTableFirstRow('LDM-CHUS', 10, true);
    cy.sortTableAndIntercept('LDM', 3);
    cy.validateTableFirstRow('LDM-CHUSJ', 10, true);
  });

  it('Valider les fonctionnalités du tableau - Tri EP', () => {
    cy.sortTableAndIntercept('EP', 3);
    cy.validateTableFirstRow('CHUS', 11, true);
    cy.sortTableAndIntercept('EP', 3);
    cy.validateTableFirstRow('CUSM', 11, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Requérant', () => {
    cy.sortTableAndIntercept('Requérant', 3);
    cy.validateTableFirstRow('-', 12, true);
    cy.sortTableAndIntercept('Requérant', 3);
    cy.validateTableFirstRow('-', 12, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Prénatal', () => {
    cy.sortTableAndIntercept('Prénatal', 3);
    cy.validateTableFirstRow('Non', 13, true);
    cy.sortTableAndIntercept('Prénatal', 3);
    cy.validateTableFirstRow('Non', 13, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Dossier', () => {
    cy.sortTableAndIntercept('Dossier', 3);
    cy.validateTableFirstRow('MRN-283791', 14, true);
    cy.sortTableAndIntercept('Dossier', 3);
    cy.validateTableFirstRow('MRN-283900', 14, true);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndIntercept('EP', 3);
    cy.sortTableAndIntercept('Dossier', 3);
    cy.validateTableFirstRow('MRN-283804', 14, true);
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.validatePaging('102', 0);
  });
});
